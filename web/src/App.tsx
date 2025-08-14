import { useState } from "react";
import {
  Container,
  Paper,
  Title,
  TextInput,
  Button,
  Group,
  Box,
  Text,
  CopyButton,
  ActionIcon,
  Tooltip,
  rem,
  Anchor,
} from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { shortenUrl } from "./hook/short_url";

export function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShortenUrl = async () => {
    setIsLoading(true);
    setError(null);
    setShortenedUrl("");

    try {
      const newShortenedUrl = await shortenUrl(originalUrl);

      console.log(newShortenedUrl);

      setShortenedUrl(newShortenedUrl);
    } catch (err) {
      setError("Não foi possível encurtar a URL. Por favor, tente novamente.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Paper p="xl" shadow="md" radius="md">
        <Title order={2} ta="center" mb="md">
          Encurtador de URL
        </Title>
        <Text c="dimmed" ta="center" mb="lg">
          Cole seu link longo abaixo para encurtá-lo instantaneamente!
        </Text>

        <TextInput
          label="URL Original"
          placeholder="https://exemplo.com/sua-url-longa"
          value={originalUrl}
          onChange={(event) => setOriginalUrl(event.currentTarget.value)}
          size="md"
          mb="sm"
          error={error}
        />

        <Button
          fullWidth
          size="md"
          onClick={handleShortenUrl}
          loading={isLoading}
          disabled={!originalUrl || isLoading}
        >
          Encurtar URL
        </Button>

        {shortenedUrl && (
          <Box
            mt="xl"
            pt="md"
            style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}
          >
            <Text fw={500} size="lg" mb="sm">
              Link Encurtado:
            </Text>
            <Group justify="space-between" align="center">
              <Text fw={600} size="md">
                <Anchor
                  href={`${import.meta.env.VITE_SERVER_URL}/${shortenedUrl}`}
                >
                  {import.meta.env.VITE_SERVER_URL}/{shortenedUrl}
                </Anchor>
              </Text>
              <CopyButton
                value={`${import.meta.env.VITE_SERVER_URL}/${shortenedUrl}`}
                timeout={2000}
              >
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? "Copiado!" : "Copiar"}
                    withArrow
                    position="right"
                  >
                    <ActionIcon
                      color={copied ? "teal" : "gray"}
                      variant="subtle"
                      onClick={copy}
                    >
                      {copied ? (
                        <IconCheck style={{ width: rem(20) }} />
                      ) : (
                        <IconCopy style={{ width: rem(20) }} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
