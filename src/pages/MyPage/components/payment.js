import toast from "react-hot-toast";
import { AxiosClient } from "../../../utils/axios";
import { handleResponse } from "../../../utils/net";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export const LbPaypal = ({ donationIndex, fetchData }) => {
  const createOrder = async () => {
    try {
      const resp = await AxiosClient.post(
        '/user/profile/buy-coins/create-order', { donationIndex })
      if (resp.status === 200) {
        const { ok, data, msg } = resp.data;
        if (ok) {
          return data;
        } else {
          toast.error(msg);
        }
      } else {
        toast.error('network error');
      }
    } catch (ex) {
      toast.error(ex.message);
    }
  }

  const onApprove = (data) => {
    AxiosClient.post('/user/profile/buy-coins/capture', { orderID: data.orderID })
      .then((resp) => {
        handleResponse(resp, (_) => {
          fetchData();
          toast.success('Payment is done.');
        });
      })
  }

  return (
    <>
      <PayPalScriptProvider
        options={{
          clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
          components: "buttons",
          currency: "USD",
        }}
      >
        <PayPalButtons
          className="max-w-24"
          createOrder={createOrder}
          onApprove={onApprove}
          style={{
            layout: "horizontal",
          }}
        />
      </PayPalScriptProvider>
    </>
  );
}
            