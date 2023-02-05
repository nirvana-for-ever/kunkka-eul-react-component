import React, { useEffect, useState } from 'react';
import './index.css';
import { store as scrollStore, setIsScrollSync as storeIsScrollSync } from '../../store/scroll';
import { FooterProps } from './types';
import { useSelector } from 'react-redux';

const Footer: React.FC<FooterProps> = (props) => {
  const [ isScrollSync, setIsScrollSync ] = useState(true);

  const checkScrollSync = () => {
    setIsScrollSync(prev => !prev);
  }

  useEffect(() => {
    scrollStore.dispatch(storeIsScrollSync(isScrollSync));
  }, [isScrollSync]);

  const { wordCount, lineCount } = useSelector((state: any) => {
    return {
      wordCount: state.wordCount,
      lineCount: state.lineCount
    };
  })

  return (
    <div className={'footer'}>
      <div className={'left'}>
        <span>字数: <strong>{ wordCount }</strong></span>
        <span>行数: <strong>{ lineCount }</strong></span>
      </div>
      <div className={'right'}>
        <div>
          <input checked={isScrollSync} type='checkbox' onClick={checkScrollSync} onChange={() => {}} />
          <span onClick={checkScrollSync}>同步滚动</span>
        </div>
        <div className={'back-top'} onClick={() => props.scrollToTop(isScrollSync)}>回到顶部</div>
      </div>
    </div>
  );
}

export default Footer;
