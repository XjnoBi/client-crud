import { createTheme } from '@mui/material'

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
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderColor: colors.gray3,
                    borderRadius: '8px',
                    ':hover': {
                        borderColor: colors.gray2,
                    }
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
                },
                completed: {
                    color: colors.green,
                },
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