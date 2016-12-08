import styled from "styled-components"

function displayColour(classType) {
    if (classType === "two") {
        return "#eee"
    }
    if (classType === "four") {
        return "rgb(229, 229, 229)"
    }
    return ""
}

function getAlign({dollar, month, country}) {
    if (country) {
        return "baseline";
    }
    if (month) {
        return "bottom";
    }
    if (dollar) {
        return "top"
    }
}

export const Li = styled.li`
    border: 1px solid #ccc;
    height: 30.4em;
    flex: 1;
    display: block;
    float: left;
    margin-right: 0;
    position: relative;
    background-color: ${(props) => displayColour(props.classType)};
    &:hover{
        cursor: pointer;
    }
    @media(min-width: 768px) and (max-width: 992px){
        height: 37.4em;
    }
    @media(max-width: 768px) {
         margin-bottom: 2em;
         height: 34.5em;
    }
`

export const Wrapper = styled.div`
padding: 1.25em;
`

export const P = styled.p`
    padding-bottom: 10px;
    margin-bottom: 1.25em;
`

export const Span = styled.span`
font-size: ${props => props.dollar && '3.75em'};
font-weight: ${props => props.dollar && '300'};
color: ${props => props.dollar ? "#333" : "#555"};
line-height: ${props => props.dollarOrMonth && '0.65em'};
vertical-align: ${props => getAlign(props)};
@media(min-width: 768px) and (max-width: 1024px) {
    font-size: ${props => props.dollar && '2.5em'}; 
}
`
export const Ul = styled.ul`
list-style: disc;
padding-left: 1.25em;
clear: both;`


export const H3 = styled.h3`
color: #b8860b;`
export const SelectDiv = styled.div`
position: absolute;
left: 0;
right: 0;
text-align: center;
bottom: 20px;
@media(max-width: 767px){
    left: 35px;
    right: 35px;
}`

export const Select = styled.select`
height: 40px;
background-color: inherit;
border: 3px solid #ccc;
border-radius: 0px;
`
export const SelectBox = styled.div`
flex-grow: 1;
flex-basis: 0px;
border: none;
border-right: none;
overflow: visible;
padding: 4px;
position: relative;
z-index: 10;
flex-grow: 1;
flex-basis: 0px;
-ms-flex-positive: 1;
-ms-preferred-size: 0px;`


export const Div = styled.article`
display: flex;
margin-bottom: 20px;
@media(max-width: 767px){
    flex-direction: column;
}`

export const Ol = styled.ol`
    z-index: 1;
    overflow: hidden;
    padding-left: 0;
    display: flex;
    font-size: 14px;
    @media(max-width: 768px) { 
        flex-direction: column;
    }
`