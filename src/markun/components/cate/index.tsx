import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { setCurSidebarVisible, store } from '../../store/markun';
import CloseIcon from '../../svg/close';
import { CateHelper } from '../../utils/html';
import './index.css';
import { CateProps } from './types';

const CatePage: React.FC<CateProps> = ({ viewerRoot }) => {
  const root = useRef<HTMLDivElement>(null);

  const helper = useMemo(() => {
    if (viewerRoot) {
      return new CateHelper(viewerRoot, 30);
    }
  }, [viewerRoot]);

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
        childList: true,
        subtree: true,
        characterData: true
      };
      observer.observe(viewerRoot, options);
      return () => {
        observer.disconnect();
      };
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
    <div
      className={'cate'}
      style={{ display: `${curSidebarVisible === 'cate' ? 'block' : 'none'}` }}
    >
      <div
        className={'close-tag'}
        onClick={() => store.dispatch(setCurSidebarVisible('none'))}
      >
        <CloseIcon />
      </div>
      <div style={{ fontWeight: '600' }}>目录</div>
      <div
        ref={root}
        className={'content'}
      ></div>
    </div>
  );
};

export default CatePage;
