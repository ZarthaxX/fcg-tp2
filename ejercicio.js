// Esta función construye una matriz de transfromación de 3x3 en coordenadas homogéneas
// utilizando los parámetros de posición, rotación y escala. La estructura de datos a
// devolver es un arreglo 1D con 9 valores en orden "column-major". Es decir, para un
// arreglo A[] de 0 a 8, cada posición corresponderá a la siguiente matriz:
//
// | A[0] A[3] A[6] |
// | A[1] A[4] A[7] |
// | A[2] A[5] A[8] |
//
// Se deberá aplicar primero la escala, luego la rotación y finalmente la traslación.
// Las rotaciones vienen expresadas en grados.

function BuildTransform( positionX, positionY, rotation, scale )
{
	 let angle = rotation * Math.PI/180;

	let translation = Array(1, 0, 0, 0, 1, 0, positionX, positionY, 1);

	let scaleTransform = Array(scale, 0, 0, 0,scale, 0, 0, 0, 1);

	let rotationTransform = Array(Math.cos(angle), Math.sin(angle), 0, -Math.sin(angle), Math.cos(angle), 0, 0, 0, 1)

	let intermediateComposition = ComposeTransforms(scaleTransform, rotationTransform);

	let composition = ComposeTransforms(intermediateComposition, translation);

	return composition;
}

// Esta función retorna una matriz que resula de la composición de trasn1 y trans2. Ambas
// matrices vienen como un arreglo 1D expresado en orden "column-major", y se deberá
// retornar también una matriz en orden "column-major". La composición debe aplicar
// primero trans1 y luego trans2.
function ComposeTransforms( trans1, trans2 )
{
	let ComTrans = Array(9)

	for (let i = 0; i < 3; i+=1){
	 	for (let j = 0; j < 3; j+=1){
			let val = 0;
			for(let k = 0; k < 3; k++){
				val+=trans2[i + 3*k] * trans1[j*3 + k];
			}
			ComTrans[i + j*3] = val;
	 	}
	}

	return ComTrans;
}
