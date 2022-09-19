import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion = {};
  id: string = '';
  constructor(private route: ActivatedRoute,
    private productosService: ProductosService) { }

  ngOnInit(): void {

    this.route.params.pipe(
      tap(param => this.id = param['id']),
      switchMap((param) => this.productosService.getProducto(param['id']))
    ).subscribe((producto: ProductoDescripcion) => {
      console.log(producto);
      this.producto = producto;

    })
  }

}
