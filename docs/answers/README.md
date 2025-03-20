# PREGUNTAS A RESPONDER

en este apartado se encuentran las preguntas que se deben responder sobre el proyecto.

## Pregunta 1

**Vue no detecta cambios dentro de objetos reactivos de la forma que esperarías. ¿Cómo podrías observar un cambio en una propiedad anidada?**

Para observar un cambio en una propiedad anidada, se puede utilizar el método `watch` de Vue. Este método permite observar un cambio en una propiedad específica de un objeto reactivo. Para observar un cambio en una propiedad anidada, se puede utilizar la notación de punto para acceder a la propiedad anidada y observarla con el método `watch`. Por ejemplo:

```javascript
const state = reactive({
  user: {
    name: 'John',
    age: 30
  }
})

watch(() => state.user.name, (newValue, oldValue) => {
  console.log(`Name changed from ${oldValue} to ${newValue}`)
})
```

En este ejemplo, se observa un cambio en la propiedad `name` del objeto `user`. Cuando la propiedad `name` cambia, se ejecuta la función de callback que imprime en consola el valor anterior y el nuevo valor de la propiedad `name`.

## Pregunta 2

**watch() permite escuchar cambios en propiedades específicas dentro de reactive(), explica cómo funciona.**

El método `watch` de Vue permite observar un cambio en una propiedad específica de un objeto reactivo. La función `watch` recibe dos argumentos: una función que retorna la propiedad que se desea observar y una función de callback que se ejecuta cuando la propiedad cambia. La función de callback recibe dos argumentos: el nuevo valor de la propiedad y el valor anterior de la propiedad.

El método `watch` se utiliza para observar cambios en propiedades específicas dentro de un objeto reactivo creado con `reactive()`. Cuando se utiliza `watch` para observar una propiedad específica, Vue establece una dependencia entre la función que retorna la propiedad y la función de callback. Esto significa que Vue detectará automáticamente los cambios en la propiedad observada y ejecutará la función de callback cuando la propiedad cambie.

Por ejemplo, en el siguiente código se observa un cambio en la propiedad `name` del objeto `user`:

```javascript
const state = reactive({
  user: {
    name: 'John',
    age: 30
  }
})

watch(() => state.user.name, (newValue, oldValue) => {
  console.log(`Name changed from ${oldValue} to ${newValue}`)
})
```

En este ejemplo, se observa un cambio en la propiedad `name` del objeto `user`. Cuando la propiedad `name` cambia, se ejecuta la función de callback que imprime en consola el valor anterior y el nuevo valor de la propiedad `name`.

## Pregunta 3

**¿Cómo harías que un watch() detecte cambios en stock dentro de un array de productos?**

Para que un `watch()` detecte cambios en la propiedad `stock` dentro de un array de productos, se puede utilizar la función `watch()` con una función de callback que recorra el array de productos y observe la propiedad `stock` de cada producto. La función de callback se ejecutará cada vez que se modifique la propiedad `stock` de algún producto en el array.

Por ejemplo, supongamos que tenemos un array de productos `products` y queremos observar los cambios en la propiedad `stock` de cada producto:

```javascript
const products = reactive([
  { name: 'Product 1', stock: 10 },
  { name: 'Product 2', stock: 5 },
  { name: 'Product 3', stock: 0 }
])

watch(() => products.map(product => product.stock), (newStock, oldStock) => {
  console.log('Stock changed in products:')
  newStock.forEach((stock, index) => {
    console.log(`${products[index].name}: ${oldStock[index]} -> ${stock}`)
  })
})
```

En este ejemplo, se observa un cambio en la propiedad `stock` de cada producto en el array `products`. Cuando se modifica la propiedad `stock` de algún producto, se ejecuta la función de callback que imprime en consola el nombre del producto, el valor anterior y el nuevo valor de la propiedad `stock`.