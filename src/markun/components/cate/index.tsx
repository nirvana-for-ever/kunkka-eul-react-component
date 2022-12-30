import React, { useEffect, useRef } from 'react';
import styles from './index.less';
import { CateProps } from './types';
import { useSelector } from 'react-redux';
import { CateHelper } from '../../utils/html';
import { ReactComponent as CloseIcon } from '../../svg/close.svg';
import { setCurSidebarVisible, store } from '../../store/markun';

const helper = new CateHelper(document.getElementById('markun-viewer'));

const CatePage: React.FC<CateProps> = () => {
  const root = useRef<HTMLDivElement>(null);

  const curSidebarVisible = useSelector((state: any) => {
    return state.curSidebarVisible;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newCate = helper.generateCate();
      if (newCate && root.current) {
        root.current.innerHTML = '';
        root.current.appendChild(newCate);
      } else if (root.current) {
        root.current.innerHTML = '';
      }
    });
    const el = document.getElementById('markun-viewer');
    if (!el) return;
    const options = {
      'childList': true,
      'subtree': true,
      'characterData': true
    } ;
    observer.observe(el, options);
  }, [])

  useEffect(() => {
    if (curSidebarVisible === 'cate') {
      const newCate = helper.generateCate();
      if (newCate && root.current) {
        root.current.innerHTML = '';
        root.current.appendChild(newCate);
      }
    }
  }, [curSidebarVisible]);

  return (
    <div className={styles['cate']} style={{ display: `${curSidebarVisible === 'cate' ? 'block' : 'none'}` }}>
      <div className={styles['close-tag']} onClick={() => store.dispatch(setCurSidebarVisible('none'))}><CloseIcon /></div>
      <div ref={root} className={styles['content']}></div>
    </div>
  )
};

export default CatePage;
