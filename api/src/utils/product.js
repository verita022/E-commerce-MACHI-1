const { Producto, Op } = require("../db");

async function getProductos(req, res) {
  try {
    let { nombre, ordenA, ordenP, filtroC, pagina } = req.query;
    let productos = []
    let resultado
    pagina = pagina ? pagina : 1
    const productosXpagina = 6
    //#region search by NAME
    if (nombre && nombre !== "") {
      productos = await Producto.findAll({
        where: {
          nombre: {
            [Op.iLike]: `%${nombre}%`,
          },
        },
      });
    } else {
      productos = await Producto.findAll(); //Si no hay input devuelve todo
    }
    //#endregion NAME
    
    //#region ORDEN ALFABETICO
    if (ordenA === "asc" || !ordenA || ordenA === "") {
      productos = productos.sort((a,b) =>{
        return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase()) 
      })
    }else{
      productos = productos.sort((a,b) =>{
        return b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase())
      })
    }
    //#endregion

    //#region ORDEN PRECIO
    if (ordenP === "asc") {
      productos = productos.sort((a, b) => {
        return a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0
      })
    }
    if (ordenP === "desc") {
      productos = productos.sort((a,b) => {
        return b.precio > a.precio ? 1 : b.precio < a.precio ? -1 : 0
      })
    }
    //#endregion

    //#region FILTRO POR CATEGORIA
    if (filtroC && filtroC !== "") {
      productos = productos.filter((producto) => {return producto.categoria === filtroC})
    }
    //#endregion

    //#region PAGINA
    resultado = productos.slice((productosXpagina * (pagina -  1)) , (productosXpagina * (pagina -  1)) + productosXpagina )
    //#endregion

    return res.send({
      resultado: resultado,
      productos: productos,
      contador: productos.length
    });
  } catch (error) {
    return res.status(404);
  }
}



async function deleteProductos(req, res) {
  const { id } = req.params;

  let product = await Producto.findByPk(id);

  Producto.destroy({
    where: {
      id: id,
    },
  });

  res.json(product); //devuelvo el producto eliminado
}


async function putProductos(req, res) {
  const { id } = req.params;

  const { nombre, imagen, precio, descripcion, disponibilidad } = req.body;

  await Producto.update(
    {
      nombre,
      imagen,
      precio,
      descripcion,
      disponibilidad,
    },
    {
      where: { id: id },
    }
  );

  const product = await Producto.findByPk(id);
  res.json(product);
}


// async function postProductos(req, res) {

//   const {array} = req.body;
//   try {
//     const Productos=await Producto.bulkCreate(array)

//     await Productos.setUsuario(id)
//     return res.json(Productos).send('Producto publicado con exito');

//   } catch (error) {
//     console.log(error);
//     res.status(404).json({error:`this is the error: ${error}`})
//   }
// }
async function postProductos(req, res) {
  const {nombre, imagen, precio, categoria, descripcion, disponibilidad } = req.body
  try {
    const Productos=await Producto.create({ nombre, imagen, precio, categoria, descripcion, disponibilidad })

    //await Productos.setUsuario(id)
    return res.send('Producto publicado con exito');

  } catch (error) {
    console.log(error);
    res.status(404).json({error:`this is the error: ${error}`})
  }
}

async function getProducto (req,res){
  const {id}=req.params
try{
  const llegadaProductoPorId=await Producto.findByPk(id)
  res.json(llegadaProductoPorId)
}catch(e){
  res.status(404).json({error:`el error es: ${e}`})
}
}


module.exports = {
  getProductos,
  putProductos,
  postProductos,
  deleteProductos,
  getProducto
};
