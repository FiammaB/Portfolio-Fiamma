// Archivos del mini editor de la portada. Cada línea es una lista de
// [texto, tipo de token]; el color de cada tipo está en TOKEN_COLORS.
export type Token = [string, 'kw' | 'str' | 'ty' | 'cm' | 'tx' | 'fn'];

export interface EditorFile {
  file: string;
  label: string;
  status: string;
  code: Token[][];
  logs: Token[];
}

export const TOKEN_COLORS: Record<Token[1], string> = {
  kw: '#C4B5FF',
  str: '#5EE6A8',
  ty: '#FF8A5B',
  cm: '#6E6690',
  tx: '#DCD4FF',
  fn: '#F5C76B',
};

export const FILES: EditorFile[] = [
  {
    file: 'Hero.tsx',
    label: 'React',
    status: 'vite',
    code: [
      [['// Hero.tsx', 'cm']],
      [['export function ', 'kw'], ['Hero', 'fn'], ['() {', 'tx']],
      [['  const ', 'kw'], ['rol = ', 'tx'], ['"Full Stack"', 'str'], [';', 'tx']],
      [['  return ', 'kw'], ['(', 'tx']],
      [['    <', 'tx'], ['h1', 'kw'], ['>', 'tx']],
      [['      Hola, soy ', 'tx'], ['Fiamma', 'ty']],
      [['    </', 'tx'], ['h1', 'kw'], ['>', 'tx']],
      [['  );', 'tx']],
      [['}', 'tx']],
    ],
    logs: [
      ['$ npm run dev', 'tx'],
      ['✓ compilado sin errores', 'str'],
      ['➜ servidor local listo', 'kw'],
    ],
  },
  {
    file: 'ProyectoController.java',
    label: 'Spring',
    status: 'spring boot',
    code: [
      [['@RestController', 'fn']],
      [['@RequestMapping', 'fn'], ['(', 'tx'], ['"/api/proyectos"', 'str'], [')', 'tx']],
      [['public class ', 'kw'], ['ProyectoController', 'ty'], [' {', 'tx']],
      [['  @GetMapping', 'fn']],
      [['  public ', 'kw'], ['List', 'ty'], ['<', 'tx'], ['Proyecto', 'ty'], ['> ', 'tx'], ['listar', 'fn'], ['() {', 'tx']],
      [['    return ', 'kw'], ['service.', 'tx'], ['findAll', 'fn'], ['();', 'tx']],
      [['  }', 'tx']],
      [['}', 'tx']],
    ],
    logs: [
      ['$ ./mvnw spring-boot:run', 'tx'],
      ['✓ aplicación iniciada', 'str'],
      ['GET /api/proyectos → 200 OK', 'kw'],
    ],
  },
  {
    file: 'pedidos.sql',
    label: 'SQL',
    status: 'mysql',
    code: [
      [['-- Clientes con más pedidos', 'cm']],
      [['SELECT ', 'kw'], ['c.nombre, ', 'tx'], ['COUNT', 'fn'], ['(p.id) ', 'tx'], ['AS ', 'kw'], ['pedidos', 'tx']],
      [['FROM ', 'kw'], ['clientes c', 'tx']],
      [['JOIN ', 'kw'], ['pedidos p ', 'tx'], ['ON ', 'kw'], ['p.cliente_id = c.id', 'tx']],
      [['GROUP BY ', 'kw'], ['c.nombre', 'tx']],
      [['ORDER BY ', 'kw'], ['pedidos ', 'tx'], ['DESC', 'kw'], [';', 'tx']],
    ],
    logs: [
      ['mysql> source pedidos.sql', 'tx'],
      ['✓ consulta ejecutada', 'str'],
      ['resultados ordenados por pedidos', 'kw'],
    ],
  },
];
