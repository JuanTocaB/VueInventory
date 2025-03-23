# REQUSITADO

En este apartado se encuentran los requerimientos necesarios para la ejecución del proyecto.

## Enunciado

Tienes una tienda online y necesitas manejar un inventario de productos en Vue. Cada producto tiene:

1. nombre (string)
2. precio (número)
3. stock (número)
4. disponible (booleano, true si stock > 0, false si stock = 0)

Debes implementar un sistema en Vue donde:

1. Cuando se reduzca el stock de un producto a 0, disponible debe cambiar automáticamente a false. 
2. Cuando se aumente el stock de un producto, si antes era false, debe volver a true. 
3. La interfaz debe mostrar dinámicamente qué productos están disponibles y cuáles no. No puedes usar computed, solo reactive() y watch().