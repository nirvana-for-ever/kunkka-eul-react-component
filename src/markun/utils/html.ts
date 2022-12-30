export class CateHelper {
  root: HTMLElement | null;
  doms: HTMLCollection | undefined;
  cateDom: HTMLElement | null = null;
  cateNodeNames = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
  children: Array<HTMLElement> = [];

  constructor(root: HTMLElement | null) {
    this.root = root;
    this.doms = root?.children;
  }

  generateCate() {
    if (!this.root) this.root = document.getElementById('markun-viewer');
    if (!this.doms) this.doms = document.getElementById('markun-viewer')?.children;
    this.cateDom = document.createElement('ul');
    this.children = [];
    this.generateDfs(this.doms);
    const res = this.cateDom;
    if (!res.childElementCount) return null;
    return this.cateDom;
  }

  private generateDfs(doms: HTMLCollection | undefined) {
    if (!doms) return;
    for (let i = 0, len = doms.length; i < len; i++) {
      const cur = doms[i] as HTMLElement;
      if (this.cateNodeNames.includes(cur.nodeName)) {
        const children = this.children;
        const root = this.root;
        const level = cur.nodeName.slice(1);
        const li = document.createElement('li');
        li.innerHTML = cur.innerHTML;
        li.classList.add(`markun-topic-${level}`);
        li.onclick = function() {
          if (root) root.scrollTop = cur.offsetTop;
          children.forEach(item => {
            item.classList.remove('markun-topic-active');
          })
          li.classList.add('markun-topic-active');
        }
        this.children.push(li);
        this.cateDom!.appendChild(li);
      }
      this.generateDfs(cur.children);
    }
  }
}
