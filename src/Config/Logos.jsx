import behance from '../Slogo/behance.png';
import canva from '../Slogo/canva.png';
import codeforce from '../Slogo/codeforce.png';
import coffee from '../Slogo/coffee.png';
import facebook from '../Slogo/facebook.png';
import github from '../Slogo/github.png';
import gmail from '../Slogo/gmail.png';
import instagram from '../Slogo/instagram.png';
import leetcode from '../Slogo/leetcode.png';
import linkedin from '../Slogo/linkedin.png';
import notion from '../Slogo/notion.png';
import portfolio from '../Slogo/portfolio.png';
import telegram from '../Slogo/telegram.png';
import threads from '../Slogo/threads.png';
import twitter from '../Slogo/twitter.png';
import youtube from '../Slogo/youtube.png';
import Snapchat from '../Slogo/snapchat.png';

export const LogoList = [
    {id: 0, name: 'Instagram', src: instagram, category: "contact"},
    {id: 1, name: 'Facebook', src: facebook, category: "contact"},
    {id: 2, name: 'Threads', src: threads, category: "contact"},
    {id: 3, name: 'Twitter', src: twitter, category: "contact"},
    {id: 4, name: 'LinkedIn', src: linkedin, category: "work"},
    {id: 5, name: 'Leetcode', src: leetcode, category: "work"},
    {id: 6, name: 'Canva', src: canva, category: "work"},
    {id: 7, name: 'Behance', src: behance, category: "work"},
    {id: 8, name: 'Codeforces', src: codeforce, category: "work"},
    {id: 9, name: 'Coffee', src: coffee, category: "work"},
    {id: 10, name: 'GitHub', src: github, category: "work"},
    {id: 11, name: 'Gmail', src: gmail, category: "contact"},
    {id: 12, name: 'Snapchat', src: Snapchat , category: "contact"},
    {id: 13, name: 'Notion', src: notion, category: "work"},
    {id: 14, name: 'Portfolio', src: portfolio, category: "work"},
    {id: 15, name: 'Telegram', src: telegram, category: "contact"},
    {id: 16, name: 'YouTube', src: youtube, category: "work"}
];

export const ImageOnly = LogoList.map((value) => value.src);

export const LogoNames = LogoList.map((value) => value.name);