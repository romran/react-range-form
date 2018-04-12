import styled from 'styled-components'
import SliderThumb from '../Icons/oval.svg'
import TipIcon from '../Icons/tip.svg'
import RadioIconC from '../Icons/radio-checked.svg'
import RadioIcon from '../Icons/radio.svg'

const theme = {
  orange: '#f35b1c',
  grey: '#e6e6e6',
  brown: '#512b2b',
  borderGrey: '#e0e0e0',
  borderDarkGrey: '#acacac',
  black: '#22222',
  golden: '#fec202'
}

export default styled.div`
  font-family: Arial,sans-serif;
  padding: 15px;
  width: 100%;
  .title {
    margin: auto;
    max-width: 750px;
    font-size: 40px;
    text-align: left;
    line-height: 44px;
    color: ${theme.orange};
    font-weight: 700;
    @media (max-width: 600px) {
      font-size: 28px;
      line-height: 32px;
     }
   }

  .step-container {
      display: flex;
      flex-direction: row;
      height: 40px;  
      align-items: center;  
      justify-content: flex-end;
    }

    strong {
      font-weight: 700;
    }

  form {
    max-width: 750px;
    margin: 15px auto;
    border-top: 1px solid ${theme.borderGrey};
    border-left: 1px solid ${theme.borderGrey};
    border-right: 1px solid ${theme.borderGrey};
    border-bottom: 1px solid ${theme.borderDarkGrey};
    padding: 25px 25px 0;
    position: relative;
    @media (max-width: 775px) {
             padding: 25px 10px 0;
            }
    >.step {
      width: 100%;
      display: block;
      border-bottom: 1px solid ${theme.borderGrey};
      margin-bottom: 18px;
      padding-bottom: 10px;
      @media (max-width: 735px) {
          padding-bottom: 5px;
          }
      .label {
        font-size: 15px;
        color: ${theme.brown};
        line-height: 20px;
        font-weight: normal;
        height: 20px;
        width: fit-content;
        white-space: nowrap;
       }
       
       .tip {
        display: block;
        height: 15px;
        width: 15px;      
        background: url('${TipIcon}') center center no-repeat;
        margin-right: 5px;
        cursor: help;
        align-self: center;
        &.right {
          margin-right: -10px;
          align-self: flex-start;
          margin-top: calc(5px / 2);
          @media (max-width: 735px) {
            margin-right: 5px;
            align-self: flex-start;
          }
          &.margin {
            margin-right: 5px;
            &:last-of-type {
            
            }
          }
        }
      }
       .step-input-title-container {
            width: 250px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            white-space: nowrap;
          }

 
      >.step-title {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        text-align: left;
        color: ${theme.brown};
        margin: 0 0 25px;
        font-size: 18px;
        font-weight: 700;
        >h2 {
          margin-right: 5px;
        }
      }
      >.step-range {
        display: flex;
        flex-direction: row;
        height: auto;  
        align-items: center;  
        justify-content: flex-end;
        flex-wrap: wrap;
        margin-bottom: 15px;
        @media (max-width: 735px) {
          justify-content: center;
           padding-bottom: 20px;
          }
          > .step-input-title-container.range {
             @media (max-width: 750px) {
              width: auto;
            }
            @media (max-width: 735px) {
              order: 1;
              margin-bottom: 15px;
            }
            >.long {
              white-space: normal;
              text-align: right;
              width: 190px;
              height: 100%;
              &.width {
                width: 230px;
                @media (max-width: 735px) {
                width: fit-content;
                text-align: center;
                height: auto;
              }
              }
              @media (max-width: 735px) {
                width: fit-content;
                text-align: center;
                height: auto;
              }
            }
          }
          >.step-range-container { 
            height: auto;
            position: relative;
            @media (max-width: 735px) {
              order: 3;
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: center;
            }
            &.up {
              align-self:flex-start;
              margin-top: 5px;
              height: auto;
              @media (max-width: 735px) {
                margin: auto;
              }
            }
            >.range-slider-container {
              min-width:0;
              height: auto;
              position: relative;
              margin: 0 5px 0 15px;
              @media (max-width: 425px) {
                min-width: 100%;
              }
              @media (max-width: 735px) {
                margin: 0;
              }
            > input[type='range'] {
              
              order: 2;
              position: relative; 
              margin: 4px 0;
              width: 300px;
              background: #ff6703; /* Old browsers */
              background: -moz-linear-gradient(left,  #ff6703 0%, #ff9900 100%); /* FF3.6-15 */
              background: -webkit-linear-gradient(left,  #ff6703 0%,#ff9900 100%); /* Chrome10-25,Safari5.1-6 */
              background: linear-gradient(to right,  #ff6703 0%,#ff9900 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
              margin: 0;
              border-radius: 3px;
              -webkit-appearance: none;
              color: transparent;
              @media (max-width: 735px) {
                margin: auto;
              }
              @media (max-width: 425px) {
                width: 100%;
              }
            }

            >input[type=range]::-ms-track {
              width: 300px;
              height: 8px;
              background: transparent;
              border-color: transparent;
              border-width: 8px 0;
              color: transparent;
             }

            >input[type=range]::-ms-thumb {
              border: none;
              height: 22px;
              width: 22px;      
              background: url('${SliderThumb}') center center no-repeat;
              background-color: transparent;
              margin-top: -2px;
              outline: none;
              position: absolute;
              z-index: 90;
            }

            >input[type=range]::-ms-fill-lower {
              background: linear-gradient(to right,  #ff6703 0%,#ff9900 100%);
              border-radius: 10px;
            }
            >input[type=range]::-ms-fill-upper {
              background: #bfbfbf;
              border-radius: 10px;
            }

            >input[type=range]::-webkit-slider-runnable-track {
              width: 100%;
              height: 8px;
              border-radius: 3px;
              position: relative;
              z-index: 80;
             }

            >input[type=range]::-webkit-slider-thumb {
               -webkit-appearance: none;
              border: none;
              height: 22px;
              width: 22px;      
              background: url('${SliderThumb}') center center no-repeat;
              background-color: transparent;
              margin-top: -7px;
              outline: none;
              position: absolute;
              z-index: 90;
            }

             >input[type=range]::-moz-range-track {
              width: 100%;
              height: 8px;
              border: none;
              border-radius: 4px;
              background: #bfbfbf;
              position: relative;
             }
             >input[type="range"]::-moz-range-progress {
                background: -moz-linear-gradient(left,  #ff6703 0%, #ff9900 100%); /* FF3.6-15 */
                height: 8px;
                border-radius: 3px;
              }
              >input[type=range]::-moz-range-thumb {
                border: none;
                height: 22px;
                width: 22px;      
                background: url('${SliderThumb}') center center no-repeat;
                background-color: transparent;
                margin-top: -7px;
                outline: none;
                position: relative;
                z-index: 90;
               }
              >input[type=range]:focus {
                outline: none;
              }
          }
        }
          >.step-text-container {
            padding-right: 25px;
            order: 3;
              @media (max-width: 735px) {
                order: 2;
                margin-bottom: 15px;
                padding-right: 0;
              }
   
          .cur-value {
            width: 58px;
            height: 30px;
            padding: 3px;
            border: 1px solid #c6c6c6;
            border-radius: 3px;
            font-size: 15px;
            margin: 0 10px;
            color: ${theme.brown};
          }
          
          input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
          }
          
          input[type="number"] {
              -moz-appearance: textfield;
          }

          >.label {
            display:inline-block;
            width: 25px;
          }
          &.month {
            >.label {
              @media (max-width: 735px) {
                width: 60px;
              }
            }
          }
          &.up {
                align-self:flex-start;
                @media (max-width: 735px) {
                  align-self: center;
                }
              }
        }
         
      }
        >.step-radio {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          min-height: 20px;
          align-self: center;
          margin-bottom: 15px;
          @media (max-width: 735px) {
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                }
            > .step-input-title-container.radio {
              @media (max-width: 735px) {
                width: auto;
                margin-bottom: 15px;
              }
                >.long {
                white-space: normal;
                text-align: right;
                width: 100%;
                height: 100%;
                font-weight: 700;
                @media (max-width: 735px) {
                  width: fit-content;
                  text-align: center;
                  height: auto;
                }
              }
              &.long-title {
                  @media (max-width: 735px) {
                  width: 100%;
                 }
              }
            }
            >.step-radio-container {
            padding-left:15px;
            width: 440px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            @media (max-width: 735px) {
                width: 100%;
                padding: 0;
                justify-content: space-around;
                flex-wrap: wrap;
              }
            >.label {
              padding: 0;
              display: flex;
              flex-direction: row;
              align-items: center;
              @media (max-width: 700px) {
                margin-bottom: 15px;
              }
              >input[type='radio'] {
                -webkit-appearance: none;
                -moz-appearance: none;
                -ms-appearance: none;
                -o-appearance: none;
                margin:0 5px 0 0;
                background-color: white;
                width: 20px;
                height: 20px;
                background: url('${RadioIcon}') center center no-repeat;
               }

                input::-ms-check {
                  color: ${theme.orange};;
                  border: 1px solid #e6e6e6;
              }

              >input[type='radio']:checked {
                height: 20px;
                width: 20px;      
                background: url('${RadioIconC}') center center no-repeat;
              }
              &:first-of-type {
                margin-right:30px;
                @media (max-width: 700px) {
                  margin-right:0px;
                }
              }
            }
            &.up {
              align-items: flex-start;
            }
          }
        }
     }

     >.result-title {
      font-size: 1.40em;
      color: #222222;
      line-height: 26px;
      font-weight: 700;
      padding-bottom: 15px;
     }
    >.results-content {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      padding-bottom: 20px;
      >.table-container {
        width: 100%;
        >.table {
            border-top: 1px solid ${theme.borderGrey};

          >.row {
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid ${theme.borderGrey};
            >.key {
              width: 50%;
              padding: 10px 14px 12px 5px;
              font-size: 15px;
              color: ${theme.brown};
              border-right: 1px solid ${theme.borderGrey};
            }
            >.value {
              min-width: 80px;
              color: ${theme.black};
              padding: 10px 8px 12px 16px;
              font-size: 15px;
              font-weight: normal;
              line-height: 1.3;
            }
          }
        }
        .buttons {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          >button {
            margin: 20px 20px 0 20px;
          }
        }
       }

      .golden {
        background: ${theme.golden};;
        color: ${theme.black};
        padding: 8px 10px;
        font-size: 14px;
        white-space: nowrap;
        width: auto;
        border: none;
        border-radius: 2px;
        &.black {
          background-color: #363636;
          color: white;
        }
      }
    }
    .error {
      display: flex;
      font-weight: bold;
      color: #800;
      flex-flow: row nowrap;
      justify-content: center;
    }
    pre {
      position: relative;
      border: 1px solid #ccc;
      background: rgba(0, 0, 0, 0.1);
      box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
      padding: 20px;
    }
  }
 
`