const scene = new THREE.Scene();
const camera =  new THREE.camera();
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

var ArToolkitSource = new THREEx.ArMarkerControls({
    sourceType: "webcam",
});
ArToolkitSource.init(function(){
    setTimeout(function(){
        ArToolkitSource.onResizeElement();
        ArToolkitSource.copyElementSizeTo(renderer.domElement);
    }, 2000)
})

var ArToolkitContext = new THREEx.ArToolkeitContext({
    cameraParametersUrl: 'camera_para.dat',
    detectionMode: 'color_and_matrix'
});
ArToolkitContext.init(function(){
    camera.projectionMatrix.copy(ArToolkitContext.getProjectionMatrix());
})


var ArMarkerControls = new THREEx.ArMarkerControls(ArToolkitContext,camera,
{
    type:'pattern',
    patternUrl:'pattern-QR_809613-248px',
    changeMatrixMode: "cameraTransformMatrix",
});

scene.visable = false;


const geometry = new THREE.CubeGeometry( 1, 1, 1 );
const material = new THREE.MeshNormalMaterial(
{

});



const cube = new THREE.Mesh( geometry, material );
cube.position.y = geometry.parameters.innerHeight/2;
scene.add( cube );

function animate() 
{
    requestAnimationFrame(animate);
    ArToolkitContext.update(ArToolkitSource.domElement);
    scene.visable = camera.visable; 
	renderer.render( scene, camera );
}