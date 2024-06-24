import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';
import { GestionService } from 'src/app/services/gestion.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-list-produits',
  templateUrl: './list-produits.component.html',
  styleUrls: ['./list-produits.component.css'],
})
export class ListProduitsComponent implements OnInit {
  produits: any[] = [];
  products = [
    {
      id: 0,
      imageUrl: '',
      nomCommercial: '',
      prix: 0,
      Conditionnement: '',
      quantite: 1,
    },
  ];
  subTotal!: any;
  quantite: number = 1;
  message: string = '';
  clientId!: number;
  selectedFile: File | null = null;

  constructor(
    private gestion: GestionService,
    private panierService: PanierService,
    private router: Router,
    private commandeService: CommandeService
  ) {}

  ngOnInit(): void {
    this.productList();
    this.panierService.loadCart();
    this.products = this.panierService.getProducts();
  }

  productList() {
    this.gestion.getAllProducts().subscribe(
      (produit: any[]) => {
        this.produits = this.filterDuplicates(produit);
      },
      (error) => {
        console.error(
          'Erreur lors du chargement de la liste des produits',
          error
        );
      }
    );
  }
  filterDuplicates(products: any[]): any[] {
    const uniqueProducts = new Map();
    products.forEach((product) => {
      const key = `${product.nomCommercial}_${product.imageUrl}_${product.prix}`;
      if (!uniqueProducts.has(key)) {
        uniqueProducts.set(key, product);
      }
    });
    return Array.from(uniqueProducts.values());
  }

  // add product to cart
  addToCart(product: any) {
    if (!this.panierService.productInCart(product)) {
      product.quantite = 1;
      this.panierService.addToCart(product);
      this.products = [...this.panierService.getProducts()];
      this.subTotal = product.prix;
    }
  }
  //change sub total amount
  changeSubTotal(product: any, index: any) {
    const qte = product.quantite;
    const amt = product.prix;
    this.subTotal = amt * qte;
    this.panierService.saveCart();
  }
  // remove product from cart
  removeFromCart(product: any) {
    this.panierService.removeProduct(product);
    this.products = this.panierService.getProducts();
  }
  get total() {
    return this.products?.reduce(
      (sum, product) => ({
        quantite: 1,
        prix: sum.prix + product.quantite * product.prix,
      }),
      { quantite: 1, prix: 0 }
    ).prix;
  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  passerCommande() {
    if (!this.selectedFile || !this.clientId) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const produitIds = this.products.map((product) => product.id);
    localStorage.setItem('cart_total', JSON.stringify(this.total));
    this.commandeService.uploadOrdonnance(
      this.selectedFile,
      this.clientId,
      produitIds
    );

    this.router.navigate(['/payement']);
  }

  /*passerCommande(){

  localStorage.setItem('cart_total', JSON.stringify(this.total));
  this.router.navigate(['/payement']);
}*/

  /*ajoutProduitPanier(id: number): void {
  this.panierService.ajouterAuPanier(id, this.quantite).subscribe(response => {
    console.log('Produit ajouté au panier avec succès', response);
   
  }, error => {
    console.error('Erreur lors de l\'ajout du produit au panier', error);
    

  });
  
 }
  */
  incrementQuantity() {
    this.quantite++;
  }

  decrementQuantity() {
    if (this.quantite > 1) {
      this.quantite--;
    }
  }
}
