import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

*{
    box-sizing: border-box;
}

body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textColor};
    margin: 0;
    padding: 0;
    transition:all 0.25s linear;
}

.canvas{
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    /* grid-template-rows: auto 1fr auto; */
    gap: 0.5rem;
    padding: 2rem;
    max-width: 100vw;
    align-items: center;
    text-align: center;
}

.type-box{
    display: block;
    max-width: 1000px;
    height: 140px;
    margin-right: auto;
    margin-left: auto;
    overflow: hidden;
}

.words{
    font-size: 32px;
    display :flex;
    flex-wrap: wrap;
    color: ${({ theme }) => theme.typeBoxText}
}

.word{
    margin: 5px;
    padding-right: 2px;
}

.hidden-input{
    opacity: 0;
}

.current{
    border-left: 2px solid orange;
    animation: blinking 2s infinite ease;
    transition: all 0.25s ease 0s, transform 0.05s ease 0s;
    
}

.current-right {
    border-right: 2px solid orange;
    animation: blinkingRight 2s infinite ease; 
}

.correct {
    color: ${({ theme }) => theme.textColor};
    /* animation: colorChange 2s infinite ease; */
}

.incorrect {
    color: red;
}

.upper-menu{
    display: flex;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.3rem;
    justify-content: space-between;
    padding: 0.5rem;
}

.modes{
    display: flex;
    gap: 0.4rem;
}

.time-mode:hover{
    color: green;
    cursor: pointer;
}

.footer {
    width: 1000px;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
}

.stats-box{
    display: flex;
    width: 1000px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
}

.left-stats{
    width: 30%;
    padding: 30px
}

.right-stats{
    width: 70%;
}

.title{
    font-size: 20px;
    color: ${({ theme }) => theme.typeBoxText};
}

.subtitle{
    font-size: 30px;
}

.header{
    width: 1000px;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;

}
.header .logo{
    cursor: pointer;
}

.MuiModal-backdrop{
    backdrop-filter: blur(2px);
}

.user-profile {
    width: 1000px;
    margin: auto;
    display: flex;
    height: 15rem;
    background: ${({ theme }) => theme.typeBoxText};
    border-radius: 20px;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    
    
}

.user{
    width: 50%;
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 1.5rem;
    padding: 1rem;
    border-right: 2px solid;
}

.info{
    width: 60%;
    padding: 1rem;
}

.picture{
    width: 40%;
}

.total-tests{
    width: 50%;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.table, .graph-user{
    margin: auto;
    width: 70%;
}

.infoAfterTest{
    display: flex;
    flex-direction: column;
    gap: 4rem;
}

.restart-btn{
    padding: 0.5rem;
    font-size: 18px;
    background-color: ${({ theme }) => theme.textColor};
    color: ${({ theme }) => theme.background};
};


@keyframes blinking{
    0%{border-left-color: ${({ theme }) => theme.textColor}}
    25%{border-left-color: ${({ theme }) => theme.background}}
    50%{border-left-color: ${({ theme }) => theme.textColor}}
    75%{border-left-color: ${({ theme }) => theme.background}}
    100%{border-left-color: ${({ theme }) => theme.textColor}}
}

@keyframes blinkingRight{
    0%{border-right-color: ${({ theme }) => theme.textColor}}
    25%{border-right-color: ${({ theme }) => theme.background}}
    50%{border-right-color: ${({ theme }) => theme.textColor}}
    75%{border-right-color: ${({ theme }) => theme.background}}
    100%{border-right-color: ${({ theme }) => theme.textColor}}
}

/* @keyframes colorChange {
    0%{color: }
} */
`;
