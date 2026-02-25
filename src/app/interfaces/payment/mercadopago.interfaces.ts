export interface MercadoPagoInstance {
  cardForm: (config: CardFormConfig) => CardFormInstance;
}

export interface CardFormConfig {
  amount: string;
  iframe: boolean;
  form: CardFormFields;
  callbacks: CardFormCallbacks;
}

export interface CardFormFields {
  id: string;
  cardNumber: FieldConfig;
  expirationDate: FieldConfig;
  securityCode: FieldConfig;
  cardholderName: FieldConfig;
  issuer: FieldConfig;
  installments: FieldConfig;
  identificationType: FieldConfig;
  identificationNumber: FieldConfig;
  cardholderEmail: FieldConfig;
}

export interface FieldConfig {
  id: string;
  placeholder?: string;
}

export interface CardFormCallbacks {
  onFormMounted: (error: Error | null) => void;
  onSubmit: (event: Event) => void;
  onFetching: (resource: string) => void;
}

export interface CardFormInstance {
  getCardFormData: () => CardFormData;
  createCardToken: () => Promise<{ id: string }>;
  unmount: () => void;
  submit: () => void;
}

export interface CardFormData {
  token: string;
  paymentMethodId: string;
  issuerId: string;
  installments: string;
  cardholderEmail: string;
  identificationType: string;
  identificationNumber: string;
}
