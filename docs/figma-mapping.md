# Figma → implementação — tabela de rastreio

fileKey: `4oYZ47ugpJqFdjd0D1sPXE`

Status: `implemented` (tela codada e testada) · `implemented-simplified` (codada, com simplificação consciente vs. o Figma)

| Node-id | Nome no Figma | Tela lógica | Status | Notas |
|---|---|---|---|---|
| 1:74 | Tela inicial | WelcomeScreen | implemented | |
| 1:146 | Tela login | LoginScreen | implemented | |
| 11:236 | Tela recuperar senha | ForgotPasswordScreen | implemented | fluxo mock (sem envio real de e-mail) |
| 20:74 | Tela apoio | SupportIntroScreen | implemented-simplified | interpretada como tela de boas-vindas pós-cadastro |
| 38:119 / 38:236 | Tela de acesso (+ estado 2) | LockScreen | implemented | PIN real + biometria, overlay sobre a stack principal |
| 38:299 / 38:2348 | Tela Dashboard (+ SOS acionado) | DashboardScreen / EmergencyAlertScreen | implemented | grid de acesso rápido, fórum recente, botão de pânico com long-press |
| 38:531 / 38:776 | Tela fórum de apoio (+ 2) | ForumListScreen / ForumPostDetailScreen | implemented | criação de post via modal (`ForumNewPostScreen`, sem frame dedicado no Figma) |
| 38:899 | Tela orientacoes | GuidanceScreen | implemented | conteúdo legal estático + link para autoridades |
| 38:1031 / 54:975 | Tela recursos de segurança (padrão + ativado) | SecuritySettingsScreen | implemented | um único componente dirigido por estado |
| 38:1216 | Tela contato com autoridades | AuthorityContactsListScreen | implemented | |
| 38:1444 | Tela contatos de confiança | ContactsListScreen | implemented | |
| 38:1561 / 38:1654 | Tela chat seguro (lista + conversa) | ChatConversationsListScreen / ChatConversationScreen | implemented | resposta automática simulada |
| 38:2091 / 38:2196 | Tela diario (+ 2) | DiaryListScreen / DiaryEntryFormScreen | implemented | mesma tela para criar/editar/ver |
| 38:2578 / 38:2914 | Tela camuflagem (+ 2) | CamouflageSettingsScreen | implemented | |
| 41:3090 | Tela adicionar contato | AddContactScreen | implemented | |
| 41:3170 | Tela alerta de emergencia | EmergencyAlertScreen | implemented | contagem regressiva de 5s com cancelar |
| 41:3312 | Tela notificacoes | NotificationsScreen | implemented | modal a partir do sino no Dashboard |
| 41:3610 | Tela editar contato | EditContactScreen | implemented | inclui exclusão |
| 54:115 / 54:381 | Tela criar conta (+ validação) | RegisterStep1Screen | implemented | |
| 54:610 | Body (criar conta passo 2) | RegisterStep2PinScreen | implemented | criação + confirmação de PIN |
| 54:845 | Document (criar conta passo 3) | RegisterStep3ConsentScreen | implemented | consentimento LGPD |
| 54:1224 | Apps falsos | FakeAppSelectorScreen | implemented | 3 disfarces (calculadora, notas, clima) |
| 54:1556 | App falso ativado | FakeAppActivatedScreen | implemented | ativação só entra em vigor no próximo background/foreground |
| 54:2116 | Icone do app falso | — | fora de escopo | troca real do ícone do app no SO exige `expo-dynamic-app-icon` + EAS dev client; não implementado no Expo Go |
| 54:2286 | App falso ativo | FakeCalculatorScreen | implemented | calculadora funcional real; long-press 3s no "C" + PIN revela o app |
| 54:2595 / 54:3153 | Contato autoridade (2 estados) | AuthorityContactDetailScreen | implemented | ligar (tel:) + enviar mensagem |
| 54:3368 | Messagem enviada para autoridade | AuthorityMessageSentScreen | implemented | |

## Simplificações conscientes vs. o Figma

- **Troca real do ícone do app no SO** (54:2116): não é possível no Expo Go. Ficaria fora deste projeto a menos que se invista em build de dev client via EAS + `expo-dynamic-app-icon`.
- **Biometria/Alert.alert**: funcionam apenas em iOS/Android reais — não há hardware biométrico nem `Alert.alert` nativo disponível no preview `--web` usado para QA nesta sessão (limitação do react-native-web, não do código).
- Todas as demais telas foram verificadas visualmente e funcionalmente via preview web (Playwright + Expo `--web`), incluindo fluxos completos: cadastro → PIN → LGPD → dashboard, lock/unlock preservando navegação, SOS com contagem regressiva, fórum/chat/diário com CRUD persistido, contatos e autoridades, troca de PIN, e o ciclo completo de camuflagem (ativar → background/foreground → disfarce → long-press + PIN → revelar).
