import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LbButton } from "../../../components/Button";
import { LbInputWithLabel } from "../../../components/Input";
import { LbPageTransition } from "../../../components/PageTransition";
import { LbSelect } from "../../../components/Select";
import { AxiosClient } from "../../../utils/axios";
import { handleResponse } from "../../../utils/net";
import { LbProfilePanel } from "../components/components";
import { LbItemCard } from "./ItemCard";
import { LbItemClasses, LbItemOrders, LbItemRarities, LbItemTypes, LbOrderDirection } from './def';

export const ProfileItemShopPage = () => {
  const [items, setItems] = useState([]);
  const [curCreeds, setCurCreeds] = useState([]);

  const [nameFilter, setNameFilter] = useState();
  const [classFilter, setClassFilter] = useState();
  const [rarityFilter, setRarityFilter] = useState();
  const [typeFilter, setTypeFilter] = useState();
  const [orderByFilter, setOrderByFilter] = useState();
  const [orderDirectionFilter, setOrderDirectionFilter] = useState();

  const onNameFilterChange = (e) => {
    setNameFilter(e.target.value);
  }

  const onClassFilterChange = (e) => {
    setClassFilter(e.target.value);
  }

  const onRarityFilterChange = (e) => {
    setRarityFilter(e.target.value);
  }

  const onTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  }

  const onOrderByFilterChange = (e) => {
    setOrderByFilter(e.target.value);
  }

  const onOrderDirectionChange = (e) => {
    setOrderDirectionFilter(e.target.value);
  }

  const fetchItems = () => {
    setItems([]);
    AxiosClient.post('/user/item/fetch', {
      filter: {
        item_name: nameFilter || '',
        item_class: +classFilter,
        item_rarity: +rarityFilter,
        item_type: +typeFilter,
        order_by: orderByFilter,
        order_dir: orderDirectionFilter,
      }
    })
      .then((resp) => {
        handleResponse(resp,
          (data) => {
            setItems(data.items);
            setCurCreeds(data.creeds);
          },
          (msg) => {
            toast.error(msg);
          })
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  const onFilterSubmitHandler = (e) => {
    e.preventDefault();
    fetchItems();
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <LbPageTransition>
      <LbProfilePanel title="Item Shop" desc={`${curCreeds} Creedians`}>
        <div className="flex pt-4 space-x-2 h-[calc(100vh-21rem)]">
          <div className="flex-none w-48 h-full p-4 overflow-auto border rounded-lg border-gray-800/50">
            <form
              onSubmit={onFilterSubmitHandler}
              className="flex flex-col space-y-2"
            >
              <LbButton type="submit">
                <MagnifyingGlassIcon className="size-4" />Filter
              </LbButton>
              <LbInputWithLabel label="Item Name" placeholder='Item name here' onChange={onNameFilterChange} />
              <LbSelect label="Class" options={LbItemClasses} onChange={onClassFilterChange} />
              <LbSelect label="Rarity" options={LbItemRarities} onChange={onRarityFilterChange} />
              <LbSelect label="Item Type" options={LbItemTypes} onChange={onTypeFilterChange} />
              <LbSelect label="Order By" options={LbItemOrders} onChange={onOrderByFilterChange} />
              <LbSelect label="Order Direction" options={LbOrderDirection} onChange={onOrderDirectionChange} />
            </form>
          </div>
          <div className="size-full">
            <div className="grow overflow-auto basis-1/2 h-[100%] p-2 border border-gray-800/50 rounded-lg">
              <div className="flex flex-wrap w-full h-fit">
                {items.map((item) => (
                  <LbItemCard key={item.item_hash} item={item} creeds={curCreeds} fetchItems={fetchItems} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </LbProfilePanel>
    </LbPageTransition>
  );
}
  