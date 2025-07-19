import React from 'react';

type ReceiptPrintProps = {
  cart: {
    product_id: number;
    name: string;
    quantity: number;
    subtotal: number;
  }[];
  total: number;
  paidAmount: number;
  paymentMethod: string;
};

const ReceiptPrint = React.forwardRef<HTMLDivElement, ReceiptPrintProps>(
  ({ cart, total, paidAmount, paymentMethod }, ref) => {
    return (
      <div ref={ref} className="p-4 font-mono text-black bg-white w-[320px] text-sm">
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold">TOKO MURIA TANI</h1>
          <p className="text-xs">Jl. Kudus - Colo</p>
          <p className="text-xs mb-1">Telp: +62 8122-6594-919</p>
          <hr className="my-2 border-black" />
          <p className="text-xs">
            Tanggal: {new Date().toLocaleDateString('id-ID')} -{' '}
            {new Date().toLocaleTimeString('id-ID')}
          </p>
        </div>

        <div className="mb-2 space-y-1">
          {cart.map((item) => (
            <div key={item.product_id} className="flex justify-between items-center">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>Rp {item.subtotal.toLocaleString('id-ID')}</span>
            </div>
          ))}
        </div>

        <hr className="my-2 border-dashed border-black" />

        <div className="text-sm space-y-1">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>Rp {total.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span>Bayar</span>
            <span>Rp {paidAmount.toLocaleString('id-ID')}</span>
          </div>
          {paidAmount > total && (
            <div className="flex justify-between text-green-700 font-semibold">
              <span>Kembalian</span>
              <span>Rp {(paidAmount - total).toLocaleString('id-ID')}</span>
            </div>
          )}
        </div>

        <div className="mt-3 text-xs text-gray-700">
          Metode Pembayaran: <span className="font-medium">{paymentMethod}</span>
        </div>

        <div className="text-center mt-4 text-xs italic">~ Terima kasih atas kunjungan Anda ~</div>
      </div>
    );
  }
);

export default ReceiptPrint;
