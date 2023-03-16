import { Switch, Group, useMantineTheme } from '@mantine/core'
import { IconSun, IconMoonStars } from '@tabler/icons-react'
import { themeSlice, selectTheme } from 'features/themeSlice'
import { useDispatch, useSelector } from 'react-redux'

export function DarkModeToggle() {
    const dispatch = useDispatch()
    const theme = useMantineTheme()
    const darkMode = useSelector(selectTheme)

    /**
     * 🌛 다크모드
     */
    const ChangeDarkMode = () => {
        dispatch(
            themeSlice.actions.setTheme({
                theme: !darkMode,
            })
        )
    }

    return (
        <Group style={{ margin: '0' }} position="center" my={30}>
            <Switch
                size="lg"
                onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5} />}
                offLabel={
                    <IconMoonStars color={theme.colors.gray[6]} size="1.25rem" stroke={1.5} />
                }
                onClick={ChangeDarkMode}
            />
        </Group>
    )
}
