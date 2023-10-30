import { Datatable } from "../../components/Datatable";
import { LbPageTransition } from "../../components/PageTransition";
import { Sorter } from "../../components/Sorter";
import { LbParagraph } from "../../components/Typography";
import { LbProfilePanel } from "./components/components";

export const ProfileCreedianLogsPage = () => {
  const buyLogColumns = [
    {
      title: 'Amount (USD)',
      dataIndex: 'amount',
      key: 'amount',
      sorter: {
        compare: Sorter.DEFAILT,
      },
    },
    {
      title: 'Buy Coins',
      dataIndex: 'buy_coins',
      key: 'buy_coins',
      sorter: {
        compare: Sorter.DEFAILT,
      },
    },
    {
      title: 'Before Coins',
      dataIndex: 'before_coins',
      key: 'before_coins',
      sorter: {
        compare: Sorter.DEFAILT,
      },
    },
    {
      title: 'After Coins',
      dataIndex: 'after_coins',
      key: 'after_coins',
      sorter: {
        compare: Sorter.DEFAILT,
      },
    },
    {
      title: 'Date',
      dataIndex: 'log_date',
      key: 'log_date',
      sorter: {
        compare: Sorter.DATE,
      },
    },
  ];

  const giftLogColumns = [
    {
      title: 'To Character Name',
      dataIndex: 'to_character_name',
      key: 'to_character_name',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Gift Coins',
      dataIndex: 'gift_coins',
      key: 'gift_coins',
      sorter: {
        compare: Sorter.DEFAILT,
      },
    },
    {
      title: 'Date',
      dataIndex: 'log_date',
      key: 'log_date',
      sorter: {
        compare: Sorter.DATE,
      },
    },
  ];

  const useLogColumns = [
    {
      title: 'Character',
      dataIndex: 'character_name',
      key: 'character_name',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
      fixed: 'left',
    },
    {
      title: 'Ip Address',
      dataIndex: 'ip_address',
      key: 'ip_address',
      sorter: {
        compare: Sorter.DEFAILT,
      },
    },
    {
      title: 'Item Name',
      dataIndex: 'product',
      key: 'product',
      sorter: {
        compare: Sorter.DEFAILT,
      },
    },
    {
      title: 'Date',
      dataIndex: 'intime',
      key: 'intime',
      sorter: {
        compare: Sorter.DATE,
      },
    },
  ];

  return (
    <LbPageTransition>
      <LbProfilePanel title='Coins Logs' className='pt-4'>
        <div className="flex flex-col space-y-4">
          <div className="p-4 border rounded-lg border-gray-800/50 backdrop-blur-sm">
            <LbParagraph className=''>Buy Log</LbParagraph>
            <Datatable columns={buyLogColumns} url={"/user/profile/coins-buy-log"} />
          </div>
          <div className="p-4 border rounded-lg border-gray-800/50 backdrop-blur-sm">
            <LbParagraph className=''>Gift Log</LbParagraph>
            <Datatable columns={giftLogColumns} url={"/user/profile/coins-gift-log"} />
          </div>
          <div className="p-4 border rounded-lg border-gray-800/50 backdrop-blur-sm">
            <LbParagraph className=''>Use Log</LbParagraph>
            <Datatable columns={useLogColumns} url={"/user/profile/coins-use-log"} />
          </div>
        </div>
      </LbProfilePanel>
    </LbPageTransition>
  )
}
                   