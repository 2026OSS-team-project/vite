import React from 'react';
import styled from 'styled-components';
import GitHubIcon from './GitHubIcon';

const StyledFooter = styled.footer`
  flex: none;
  background-color: #e0e0e0;
  color: #333;
  padding: 16px 24px;
  text-align: center;

  & .footer-github {
    display: inline-block;
    margin-bottom: 8px;
  }

  & .footer-github svg {
    width: 24px;
    height: 24px;
    fill: #333;
    transition: fill 0.2s;
  }

  & .footer-github:hover svg {
    fill: #000;
  }

  & .footer-text {
    font-size: 14px;
    margin: 0;
  }

  & .footerheart {
    color: #D4726A;
  }

  & .footerlink {
    text-decoration: none;
    color: #226666;
    transition: color 0.2s;
  }

  & .footerlink:hover {
    color: #1a4f4f;
    text-decoration: underline;
  }
`;

const Footer = () => (
  <StyledFooter>
    <a
      className="footer-github"
      href="https://github.com/ovidiubute/react-memory-puzzle"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View on GitHub"
    >
      <GitHubIcon />
    </a>
    <p className="footer-text">
      Made with{' '}
      <span className="footerheart">&#9829;</span>
      {' '}by{' '}
      <a
        className="footerlink"
        href="https://github.com/react-puzzle-games"
        rel="noopener noreferrer"
        target="_blank"
      >
        React Puzzle Games
      </a>
    </p>
  </StyledFooter>
);

export default Footer;
