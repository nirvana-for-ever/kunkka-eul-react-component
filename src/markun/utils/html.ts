export class CateHelper {
  root: HTMLElement | null | undefined;
  doms: HTMLCollection | undefined;
  cateDom: HTMLElement | null = null;
  cateNodeNames = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
  children: Array<HTMLElement> = [];
  toTop: number;

  constructor(root?: HTMLElement | null | undefined, toTop: number = 0) {
    this.root = root;
    this.doms = root?.children;
    this.toTop = toTop;
  }

  generateCate() {
    if (!this.root || !this.doms) return null;
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
        const root = this.root!;
        const level = cur.nodeName.slice(1);
        const li = document.createElement('li');
        li.innerHTML = cur.innerHTML;
        li.classList.add(`markun-topic-${level}`);
        li.onclick = () => {
          const rootP = this.getScrollableParent(root);
          if (!this.isScrollable(root) && rootP) {
            rootP.scrollTop = this.getTop(rootP, cur) - this.toTop;
          } else if (rootP) {
            rootP.scrollTop = this.getTop(rootP, root) - this.toTop;
            root.scrollTop = this.getTop(root, cur);
          } else {
            root.scrollTop = this.getTop(root, cur) - this.toTop;
          }
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

  // 获取可滚动的父级元素
  private getScrollableParent(dom: HTMLElement): HTMLElement | null {
    const parent = dom.parentElement;
    if (!parent) return null;
    if (this.isScrollable(parent)) return parent;
    return this.getScrollableParent(parent);
  }

  private isScrollable(dom: HTMLElement) {
    if (!dom) return false;
    if (dom.scrollTop !== 0) return true;
    dom.scrollTop = 1;
    if (dom.scrollTop === 1) {
      dom.scrollTop = 0;
      return true;
    }
    return false;
  }

  // 获取子元素到祖宗级元素(父级或更高级)顶部的距离
  private getTop(ancestors: HTMLElement, son: HTMLElement) {
    return son.getBoundingClientRect().top - ancestors.getBoundingClientRect().top;
  }
}
