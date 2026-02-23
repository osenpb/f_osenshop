// import { HttpClient } from '@angular/common/http';
// import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
// import { environment } from '../../../environments/environment';

// declare var MercadoPago: any;

// @Component({
//   selector: 'app-payment',
//   standalone: true,
//   imports: [],
//   templateUrl: './payment.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class PaymentComponent implements OnInit {

//   mp: any;
//   cardForm: any;
//   private http = inject(HttpClient);

//   ngOnInit() {
//     this.mp = new MercadoPago(environment.mercadoPagoPublicKey, {
//       locale: 'es-PE'
//     });

//     this.cardForm = this.mp.cardForm({
//       amount: "100.00",
//       iframe: true,
//       form: {
//         id: "form-checkout",
//         cardNumber: { id: "form-checkout__cardNumber", placeholder: "Card Number" },
//         expirationDate: { id: "form-checkout__expirationDate", placeholder: "MM/YY" },
//         securityCode: { id: "form-checkout__securityCode", placeholder: "CVV" },
//         cardholderName: { id: "form-checkout__cardholderName", placeholder: "Cardholder Name" },
//         issuer: { id: "form-checkout__issuer" },
//         installments: { id: "form-checkout__installments" },
//         identificationType: { id: "form-checkout__identificationType" },
//         identificationNumber: { id: "form-checkout__identificationNumber", placeholder: "DNI" },
//         cardholderEmail: { id: "form-checkout__cardholderEmail", placeholder: "Email" },
//       },
//       callbacks: {
//         onFormMounted: (error: any) => {
//           if (error) console.error("Form mount error:", error);
//         },
//         onSubmit: (event: any) => {
//           event.preventDefault();
//           const { token, installments } = this.cardForm.getCardFormData();

//           this.http.post('/api/payment/process', {
//             token,
//             installments: Number(installments),
//             transactionAmount: 100.00,
//             description: 'Portfolio product',
//             email: 'test@test.com'
//           }).subscribe({
//             next: (res: any) => console.log('Payment status:', res.status),
//             error: (err) => console.error('Payment error:', err)
//           });
//         },
//         onFetching: (resource: any) => console.log("Fetching:", resource)
//       }
//     });
//   }
// }
