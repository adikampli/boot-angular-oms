import { Order } from "../Models/Order";
import { Component } from "@angular/core";
import { OrderLine } from "../Models/OrderLine";
import { OrderService } from "../Service/OrderService";

@Component({
    selector: "order-ui",
    templateUrl: "../views/orderUITemplate.html",
    styles: [`.scrollable0panel{
        max-height: 300px;
        overflow: auto;
    }`],
    providers: [OrderService]
})
export class OrderComponent {
    CurrentOrder: Order = new Order();
    orders: Order[] = [];
    displayError: string;

    constructor(private orderService: OrderService) {

    }

    public get value(): string {
        return JSON.stringify(this.CurrentOrder);
    }


    public onSubmit() {
        this.displayError = null;
        console.log("Submit clicked" + this.CurrentOrder.buyer);
        this.orderService.saveOrder(this.CurrentOrder)
            .subscribe(
                res => {
                    console.log(res);
                    this.CurrentOrder = res;
                    this.get();
                },
                err => {
                    console.log(err);
                    this.displayError = err.error.message;
                }
            );
    }
    public addNewLine() {
        this.CurrentOrder.orderLines.push(new OrderLine());
    }

    public get() {
        this.orderService.getOrders()
            .subscribe(
                data => { this.orders = data },
                err => console.error(err),
                () => console.log('done loading orders')
            );
    }


}



