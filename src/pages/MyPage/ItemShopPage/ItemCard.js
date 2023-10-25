import { BsQuestionCircle } from 'react-icons/bs';
import { LbLabelButton } from '../../../components/Button';
import { LbWithdrawDialog } from './WithdrawDialog';
import { LbItemClasses, LbItemRarities, LbItemTypes } from './def';

const LbItemCardDesc = ({ name, value }) => {
  return (
    <div className='grid grid-cols-10'>
      <div className="flex justify-start col-span-3">{name}:</div>
      <div className="col-span-7 text-wrap">{value}</div>
    </div>
  );
}


export const LbItemCard = ({ item, creeds, fetchItems }) => {
  const modalId = 'modal-' + item.item_hash;
  const lowCreeds = creeds < item.item_price;
  const limited = item.withdrawn >= item.item_limit;
  const disabled = lowCreeds || limited;
  const lowCreedsMsg = '⚠️ LOW CREEDIANS';
  const limitedMsg = '⚠️ LIMTED';
  const errMsg = lowCreeds ? lowCreedsMsg : (limited ? limitedMsg : '');

  return (
    <div className={`p-4 pt-2 m-1 h-auto text-base border rounded-lg border-gray-600/30 w-[13.4rem] text-yellow-600 ${disabled ? 'bg-red-800/30' : 'bg-gray-800/30'} hover:border-gray-500 lb-transition`}>
      <div className='flex justify-end w-full'>
        <div className="popover">
          <LbLabelButton className="popover-trigger" tabIndex="0">
            <BsQuestionCircle className="size-4" />
          </LbLabelButton>
          <div className="p-4 border border-gray-800 popover-content popover-bottom bg-gray-900/90 backdrop-blur-sm" tabIndex="0">
            <div className="border-t border-gray-800 popover-arrow"></div>
            <div className="text-gray-200 whitespace-pre-wrap max-h-[20rem] overflow-auto">
              {item.item_desc}
            </div>
          </div>
        </div>
      </div>
      <img
        src={item.item_image}
        alt="card"
        className="mx-auto rounded-md border-gray-800/50 size-48"
      />
      <div className="flex flex-col mx-auto my-2 -space-y-1 text-sm lb-text-font sm:text-base">
        <LbItemCardDesc name="Name" value={item.item_name} />
        <LbItemCardDesc name="Price" value={item.item_price} />
        <LbItemCardDesc name="Class" value={LbItemClasses[item.item_class]} />
        <LbItemCardDesc name="Rarity" value={LbItemRarities[item.item_rarity]} />
        <LbItemCardDesc name="Type" value={LbItemTypes[item.item_type]} />
        <LbItemCardDesc name="Limit" value={item.withdrawn + ' / ' + item.item_limit} />
      </div>
      <div className='flex justify-end w-full'>
        {
          disabled
            ? <p className='pr-2'>{errMsg}</p>
            : <>
              <LbLabelButton htmlFor={modalId}>
                WITHDRAW
              </LbLabelButton>
              <LbWithdrawDialog id={modalId} fetchItems={fetchItems} item={item} creeds={creeds} />
            </>
        }
      </div>
    </div>
  );
}
          