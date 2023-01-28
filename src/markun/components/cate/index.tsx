import React, { useEffect, useMemo, useRef } from 'react';
import styles from './index.less';
import { CateProps } from './types';
import { useSelector } from 'react-redux';
import { CateHelper } from '../../utils/html';
import { ReactComponent as CloseIcon } from '../../svg/close.svg';
import { setCurSidebarVisible, store } from '../../store/markun';

const CatePage: React.FC<CateProps> = ({ viewerRoot }) => {
  const root = useRef<HTMLDivElement>(null);

  const helper = useMemo(() => {
    if (viewerRoot) {
      return new CateHelper(viewerRoot, 100);
    }
  }, [viewerRoot])

  const curSidebarVisible = useSelector((state: any) => {
    return state.curSidebarVisible;
  });

  useEffect(() => {
    if (helper && viewerRoot) {
      const observer = new MutationObserver(() => {
        const newCate = helper.generateCate();
        if (newCate && root.current) {
          root.current.innerHTML = '';
          root.current.appendChild(newCate);
        } else if (root.current) {
          root.current.innerHTML = '';
        }
      });
      const options = {
        'childList': true,
        'subtree': true,
        'characterData': true
      } ;
      observer.observe(viewerRoot, options);
    }
  }, [viewerRoot, helper]);

  useEffect(() => {
    if (helper && curSidebarVisible === 'cate') {
      const newCate = helper.generateCate();
      if (newCate && root.current) {
        root.current.innerHTML = '';
        root.current.appendChild(newCate);
      }
    }
  }, [helper, curSidebarVisible]);

  return (
    <div className={styles['cate']} style={{ display: `${curSidebarVisible === 'cate' ? 'block' : 'none'}` }}>
      <div className={styles['close-tag']} onClick={() => store.dispatch(setCurSidebarVisible('none'))}><CloseIcon /></div>
      <div ref={root} className={styles['content']}></div>
    </div>
  )
};

export default CatePage;
