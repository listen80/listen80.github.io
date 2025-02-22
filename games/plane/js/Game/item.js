import { createSpriteImage } from '../utils.js'
export function createItem() {
    var props = createSpriteImage("img/exp.png", Math.random() * 450, 0);
    props.anchor.set(0.5, 0.5);
    props.y = -20
    props.onUpdate = () => { props.y += 2 }
    props.name = "item"
    props.onCrash = () => {
        props.parent?.removeChild(props)
    }
    return props;
}
