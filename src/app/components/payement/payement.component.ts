import { Component, OnInit } from '@angular/core';
import { NgxStripeModule, StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css']
})
export class PayementComponent implements OnInit {
  cartTotal! : any;
  
  showSuccess!: any;
  handler: any = null;
  total: any;

  constructor() { }

  ngOnInit(): void {
    this.cartTotal = JSON.parse(localStorage.getItem('cart_total') as any) || "";
    console.log(this.cartTotal);
    //this.initConfig();
    this.loadStripe();
  }
  payer(total:any){
    var handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51PPrIdBeNJuPh5fMzB36CdQs10WDcO1wKZpNxiic0kAG76Gpqrytpow9EboSC4GyfxLT70cFZdwgLSwWQq4fnVGT00Ds2DJzEs',
        locale: 'auto',
        token: function (token: any) {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          console.log(token);
          alert('Token created !');
        }
      });
    handler.open({
        name :'paiement' ,
        Description:'paiement description' ,
        total: total*100
    });
  }
  loadStripe(){
    if(!window.document.getElementById('stripe-script')){
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).stripeChekout.configure({
          key: 'pk_test_51PPrIdBeNJuPh5fMzB36CdQs10WDcO1wKZpNxiic0kAG76Gpqrytpow9EboSC4GyfxLT70cFZdwgLSwWQq4fnVGT00Ds2DJzEs',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
            alert('Payment success !!')
          }
        });
      }
      window.document.body.appendChild(s);
    }
  }
/*
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'TND',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'TND',
                    value: '{this.cartTotal}',
                    breakdown: {
                        item_total: {
                            currency_code: 'TND',
                            value:  '{this.cartTotal}'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'TND',
                        value:  '{this.cartTotal}',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            this.resetStatus();
        }
    };
}
*/
}


  



