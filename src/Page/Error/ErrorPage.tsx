import { createStyles, Title, Text, Button, Container, Group, rem } from '@mantine/core'

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: rem(130),
        paddingBottom: rem(120),
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
            .background,
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: rem(220),
        lineHeight: 1,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        color: theme.colors[theme.primaryColor][3],

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(120),
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: rem(38),
        color: theme.white,

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(32),
        },
    },

    description: {
        maxWidth: rem(540),
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        color: theme.colors[theme.primaryColor][1],
    },
}))

export default function ErrorPage() {
    const { classes } = useStyles()

    return (
        <div className={classes.root}>
            <Container>
                <div className={classes.label}>404</div>
                <Title className={classes.title}>사용자 정보를 불러오는데 실패하였습니다.</Title>
                <Text size="lg" align="center" className={classes.description}>
                    <br />
                    오류가 계속되면 Q&A 페이지에서 문의 부탁드립니다.
                    <br />
                    불편을 드려 죄송합니다.😥
                </Text>
                <Group position="center">
                    <Button variant="white" size="md" onClick={() => window.location.reload()}>
                        새로고침🔃
                    </Button>
                </Group>
            </Container>
        </div>
    )
}
