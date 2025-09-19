import en from './en'
import fr from './fr'
import es from './es'
import ar from './ar'
import ru from './ru'
import zh from './zh'

export const messages = { en, fr, es, ar, ru, zh }
export type Language = keyof typeof messages
