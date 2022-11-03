interface Figure {
    x: number,
    y: number,
    rotate: number,
    color: string,
}

interface Rectangle extends Figure {
    type: 'rectangle',
    width: number,
    height: number,
}

interface Circle extends Figure {
    type: 'circle',
    radius: number,
}

interface Triangle extends Figure {
    type: 'triangle',
    width: number,
    height: number,
    vertexOffset: number,
}

export {
    Figure,
    Rectangle,
    Circle,
    Triangle,
}
