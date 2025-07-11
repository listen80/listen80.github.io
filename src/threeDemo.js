import * as THREE from './lib/three.module.js';

// 文字数组，可根据需求修改
const texts = [
    '第一页文字',
    '第二页文字',
    '第三页文字'
];

let planes = [];
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let isHovered = new Array(texts.length).fill(false);

export function initThreeScene() {
    // 创建场景
    const scene = new THREE.Scene();

    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;    
    `
    document.body.appendChild(renderer.domElement);

    // 为每个文字创建一个平面
    texts.forEach((text, index) => {
        // 创建文字材质
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = '30px Arial';
        const metrics = context.measureText(text);
        const textWidth = metrics.width;
        canvas.width = textWidth;
        canvas.height = 40;
        context.font = '30px Arial';
        context.fillStyle = 'white';
        context.fillText(text, 0, 30);

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const geometry = new THREE.PlaneGeometry(canvas.width / 100, canvas.height / 100);
        const plane = new THREE.Mesh(geometry, material);
        
        // 初始位置设置在相机远处
        plane.position.z = -20;
        // 排列平面
        plane.position.x = (index - (texts.length - 1) / 2) * 2.5;
        scene.add(plane);
        planes.push(plane);
    });

    // 添加鼠标移动和点击事件监听
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('click', onMouseClick, false);

    // 渲染循环
    function animate() {
        requestAnimationFrame(animate);

        planes.forEach((plane, index) => {
            // 向相机移动
            plane.position.z += 0.05;
            if (plane.position.z > 5) {
                plane.position.z = -20;
            }

            // 旋转效果
            plane.rotation.x += 0.01;
            plane.rotation.y += 0.01;

            // 悬停效果
            if (isHovered[index]) {
                plane.scale.set(1.2, 1.2, 1.2);
            } else {
                plane.scale.set(1, 1, 1);
            }
        });

        renderer.render(scene, camera);
    }

    animate();

    function onMouseMove(event) {
        // 计算鼠标在标准化设备坐标中的位置
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // 通过鼠标位置和相机更新射线
        raycaster.setFromCamera(mouse, camera);

        // 计算射线与平面的交点
        const intersects = raycaster.intersectObjects(planes);

        isHovered.fill(false);
        intersects.forEach(intersect => {
            const index = planes.indexOf(intersect.object);
            isHovered[index] = true;
        });
    }

    function onMouseClick(event) {
        // 计算鼠标在标准化设备坐标中的位置
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // 通过鼠标位置和相机更新射线
        raycaster.setFromCamera(mouse, camera);

        // 计算射线与平面的交点
        const intersects = raycaster.intersectObjects(planes);

        if (intersects.length > 0) {
            const clickedIndex = planes.indexOf(intersects[0].object);
            console.log(`你点击了第 ${clickedIndex + 1} 页文字: ${texts[clickedIndex]}`);
            // 这里可以添加点击后的其他逻辑，比如跳转到其他页面等
        }
    }
}