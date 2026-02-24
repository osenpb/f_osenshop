export interface MercadoPagoPaymentRequest {
  token: string;
  payment_method_id?: string;
  issuer_id?: string;
  transaction_amount: number;
  installments: number;
  description: string;
  payer: {
    email: string;
  };
}
