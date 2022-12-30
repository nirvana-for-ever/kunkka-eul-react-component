export const mermaidMap: { [key: string]: string } = {
  graph: '流程图',
  sequenceDiagram: '时序图',
  classDiagram: '类图',
  stateDiagram: '状态图',
  erDiagram: '关系图',
  journey: '旅程图',
  gantt: '甘特图',
  pie: '饼状图'
}

const prefix = '\n\`\`\`mermaid\n';
const suffix = '\n\`\`\`';

export const mermaidContent: { [key: string]: string } = {
  graph: `${prefix}graph TD\nStart --> Stop${suffix}`,
  sequenceDiagram: `${prefix}sequenceDiagram\nAlice->>John: Hello John, how are you?\nJohn-->>Alice: Great!\nAlice-)John: See you later!${suffix}`,
  classDiagram: `${prefix}classDiagram\nAnimal <|-- Duck\nAnimal <|-- Fish\nAnimal <|-- Zebra\nAnimal : +int age\nAnimal : +String gender\nAnimal: +isMammal()\nAnimal: +mate()\nclass Duck{\n+String beakColor\n+swim()\n+quack()\n}\nclass Fish{\n-int sizeInFeet\n-canEat()\n}\nclass Zebra{\n+bool is_wild\n+run()\n}${suffix}`,
  stateDiagram: prefix + 'stateDiagram-v2\n' +
  '[*] --> Still\n' +
  'Still --> [*]\n' +
  '\n' +
  'Still --> Moving\n' +
  'Moving --> Still\n' +
  'Moving --> Crash\n' +
  'Crash --> [*]' + suffix,
  erDiagram: prefix + 'erDiagram\n' +
  'CUSTOMER ||--o{ ORDER : places\n' +
  'ORDER ||--|{ LINE-ITEM : contains\n' +
  'CUSTOMER }|..|{ DELIVERY-ADDRESS : uses' + suffix,
  journey: prefix + 'journey\n' +
  'title My working day\n' +
  'section Go to work\n' +
  'Make tea: 5: Me\n' +
  'Go upstairs: 3: Me\n' +
  'Do work: 1: Me, Cat\n' +
  'section Go home\n' +
  'Go downstairs: 5: Me\n' +
  'Sit down: 5: Me' + suffix,
  gantt: prefix + 'gantt\n' +
  'title A Gantt Diagram\n' +
  'dateFormat  YYYY-MM-DD\n' +
  'section Section\n' +
  'A task           :a1, 2014-01-01, 30d\n' +
  'Another task     :after a1  , 20d\n' +
  'section Another\n' +
  'Task in sec      :2014-01-12  , 12d\n' +
  'another task      : 24d' + suffix,
  pie: prefix + 'pie title Pets adopted by volunteers\n' +
  '"Dogs" : 386\n' +
  '"Cats" : 85\n' +
  '"Rats" : 15' + suffix
}
