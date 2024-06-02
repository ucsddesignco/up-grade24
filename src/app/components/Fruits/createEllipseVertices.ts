import { Vertex } from 'matter-js';

type EllipseVerticesProps = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  steps: number;
};

export default function createEllipseVertices({
  cx,
  cy,
  rx,
  ry,
  steps
}: EllipseVerticesProps) {
  const vertices = [];
  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * (2 * Math.PI);
    const x = cx + rx * Math.cos(angle);
    const y = cy + ry * Math.sin(angle);
    vertices.push({ x, y } as Vertex);
  }
  return vertices;
}
