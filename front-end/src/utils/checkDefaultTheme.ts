export const checkDefaultTheme = ()=>{
    const theme = localStorage.getItem('themeMode') as string
    const html = document.querySelector('html')
    if (html){
      html.classList.remove("light", "dark")
      html.classList.add(theme)
    }
    return theme
  }