import { alpha, createTheme } from '@mui/material'

import {colors} from 'utils/colors'

const theme = createTheme({
    palette: {
        primary: {
            main: colors.blue,
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    padding: '0.8rem 1.6rem',
                    textTransform: 'none',
                }
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: '1.3rem 2rem'
                }
            }
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: '3rem 2rem'
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    padding: '2rem 2rem'
                }
            }
        },
        MuiInputLabel: {
            defaultProps: {
                disableAnimation: true
            },
            styleOverrides: {
                root: {
                    color: colors.gray,
                    fontSize: '14px',
                    transform: 'none',
                    transition: 'none',
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    'label + &': {
                        marginTop: '2rem'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.white,
                    borderColor: colors.gray,
                    borderRadius: '4px',
                    transition: 'none',
                    '&:focus': {
                        boxShadow: `${alpha(colors.blue, 0.25)} 0 0 0 0.2rem`,
                        borderColor: colors.blue,
                    },
                },
                input: {
                    padding: '14px'
                }
            }
        },
        MuiStepIcon:{
            styleOverrides: {
                root: {
                    color: colors.gray,
                    '&.Mui-completed': {
                        color: colors.green,    
                    }
                },
            }
        },
        MuiStepLabel: {
            styleOverrides: {
                label: {
                    fontWeight: 'bold',
                    '&.Mui-active': {
                        fontWeight: 'bold',
                    }
                }
            }
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.white,
                    borderRadius: '8px',
                    th: {
                        fontWeight: 'bold',
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    '&.highlight': {
                        color: colors.blue,
                    },
                    padding: '16px 32px'
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: '0px',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                }
            }
        },
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.white,
                    borderRadius: '0px',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px',
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.white,
                    borderRadius: '8px',
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                h4: {
                    marginBottom: '1.5rem',
                }
            }
        }
    }
})

export default theme