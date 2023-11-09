import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LbButton } from "../../../components/Button";
import { LbSelect } from "../../../components/Select";
import { AxiosClient } from "../../../utils/axios";
import { isInvalid } from "../../../utils/basic";
import { handleResponse } from "../../../utils/net";
import { LbItemClasses, LbItemRarities, LbItemTypes } from './def';

const LbItemCardDesc = ({ name, value }) => {
  return (
    <>
      <div className="flex justify-start col-span-3">{name}:</div>
      <div className="col-span-7 text-wrap">{value}</div>
    </>
  );
}

export const LbWithdrawDialog = ({ id, fetchItems, item, creeds }) => {
  const [characters, setCharacters] = useState([]);
  const [characterNo, setCharacterNo] = useState();
  const [charError, setCharError] = useState(false);

  const fetchData = () => {
    AxiosClient.post(`/user/profile/characters`)
      .then((resp) => {
        handleResponse(resp,
          (data) => {
            let chars = Object.assign({}, ...data.map((x) => ({ [x.character_no]: x.character_name })));
            setCharacters(chars);
          },
          (msg) => {
            toast.error(msg);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  useEffect(() => fetchData(), []);

  const onCharacterChange = (e) => {
    setCharacterNo(e.target.value);
    setCharError(false);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (isInvalid(characterNo)) {
      return setCharError(true);
    }

    AxiosClient.post(`/user/item/withdraw`, {
      character_no: characterNo,
      item_hash: item.item_hash,
    })
      .then((resp) => {
        handleResponse(resp,
          () => {
            toast.success('Item purchased.');
          },
          (msg) => {
            toast.error(msg);
          });
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        fetchItems();
      });
  }

  return (
    <>
      <input className="modal-state" id={id} type="checkbox" />
      <div className="modal">
        <label className="modal-overlay" htmlFor={id}></label>
        <div className="flex flex-col w-full gap-5 text-gray-200 border modal-content p-7 border-gray-800/50 bg-gray-900/70 backdrop-blur-sm">
          <label htmlFor={id} className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</label>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl text-center">Withdraw Now ({creeds} Creedians)</h2>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-x-4">
              <div className="grid grid-cols-10 my-2 text-sm h-fit gap-x-1 lb-text-font sm:text-base">
                <LbItemCardDesc name="Name" value={item.item_name} />
                <LbItemCardDesc name="Class" value={LbItemClasses[item.item_class]} />
                <LbItemCardDesc name="Rarity" value={LbItemRarities[item.item_rarity]} />
                <LbItemCardDesc name="Type" value={LbItemTypes[item.item_type]} />
                <LbItemCardDesc name="Limit" value={item.item_limit} />
                <LbItemCardDesc name="Price" value={item.item_price} />
              </div>
              <img
                src={item.item_image}
                alt="card"
                className="mx-auto rounded-md border-gray-800/50 size-[10rem]"
              />
              <div className="flex flex-col col-span-2">
                <label className="-mt-2">Description:</label>
                <label className="overflow-auto max-h-[10rem] whitespace-pre-wrap bg-gray-800/20 rounded-md px-2 py-1 border border-gray-800">
                  {item.item_desc}
                </label>
              </div>
              <div className="col-span-2 mt-4 border-t border-gray-800">
                <LbSelect label="Character" placeholder='Select a Character' options={characters} onChange={onCharacterChange} />
                {charError ? <p className="text-red-500">You must select a character.</p> : null}
              </div>
            </div>
            <form className="flex items-center w-fill form-group" onSubmit={onSubmitHandler}>
              <LbButton className='w-40'>WITHDRAW</LbButton>
            </form>
          </div>
        </div>
      </div >
    </>
  );
}
                                   