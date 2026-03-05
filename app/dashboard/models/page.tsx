'use client'

import { useState, useMemo, useCallback } from 'react'
import useSWR from 'swr'
import { useDashboard } from '@/lib/dashboard-context'
import { AuthGuard } from '@/components/dashboard/auth-guard'
import { MODEL_CATALOG, PROVIDERS, type Capability, type PricingType } from '@/lib/model-catalog'

// ── Provider SVG logos ───────────────────────────────────────────────────
const PROVIDER_PATHS: Record<string, string | string[]> = {
  OpenAI:         'M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.77 19.9a4.5 4.5 0 0 1-6.17-1.596zm-1.15-9.847a4.485 4.485 0 0 1 2.341-1.97V12.3a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.45 8.457zm16.57 3.866-5.837-3.37L15.2 7.79a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.684zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.785 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z',
  'OpenAI Plus':  'M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.77 19.9a4.5 4.5 0 0 1-6.17-1.596zm-1.15-9.847a4.485 4.485 0 0 1 2.341-1.97V12.3a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.45 8.457zm16.57 3.866-5.837-3.37L15.2 7.79a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.684zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.785 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z',
  Anthropic:      'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z',
  Gemini:         'M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81',
  // Grok logo (LobeHub)
  Grok:           ['M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292', 'M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815'],
  Mistral:        'M0 0h4v4H0zm6 0h4v4H6zM0 6h4v4H0zm6 0h4v4H6zm6 0h4v4h-4zm6 0h4v4h-4zM6 12h4v4H6zm6 0h4v4h-4zM0 18h4v4H0zm6 0h4v4H6zm6 0h4v4h-4zm6 0h4v4h-4z',
  Ollama:         'M16.361 10.26a.894.894 0 0 0-.558.47l-.072.148.001.207c0 .193.004.217.059.353.076.193.152.312.291.448.24.238.51.3.872.205a.86.86 0 0 0 .517-.436.752.752 0 0 0 .08-.498c-.064-.453-.33-.782-.724-.897a1.06 1.06 0 0 0-.466 0zm-9.203.005c-.305.096-.533.32-.65.639a1.187 1.187 0 0 0-.06.52c.057.309.31.59.598.667.362.095.632.033.872-.205.14-.136.215-.255.291-.448.055-.136.059-.16.059-.353l.001-.207-.072-.148a.894.894 0 0 0-.565-.472 1.02 1.02 0 0 0-.474.007Zm4.184 2c-.131.071-.223.25-.195.383.031.143.157.288.353.407.105.063.112.072.117.136.004.038-.01.146-.029.243-.02.094-.036.194-.036.222.002.074.07.195.143.253.064.052.076.054.255.059.164.005.198.001.264-.03.169-.082.212-.234.15-.525-.052-.243-.042-.28.087-.355.137-.08.281-.219.324-.314a.365.365 0 0 0-.175-.48.394.394 0 0 0-.181-.033c-.126 0-.207.03-.355.124l-.085.053-.053-.032c-.219-.13-.259-.145-.391-.143a.396.396 0 0 0-.193.032zm.39-2.195c-.373.036-.475.05-.654.086-.291.06-.68.195-.951.328-.94.46-1.589 1.226-1.787 2.114-.04.176-.045.234-.045.53 0 .294.005.357.043.524.264 1.16 1.332 2.017 2.714 2.173.3.033 1.596.033 1.896 0 1.11-.125 2.064-.727 2.493-1.571.114-.226.169-.372.22-.602.039-.167.044-.23.044-.523 0-.297-.005-.355-.045-.531-.288-1.29-1.539-2.304-3.072-2.497a6.873 6.873 0 0 0-.855-.031zm.645.937a3.283 3.283 0 0 1 1.44.514c.223.148.537.458.671.662.166.251.26.508.303.82.02.143.01.251-.043.482-.08.345-.332.705-.672.957a3.115 3.115 0 0 1-.689.348c-.382.122-.632.144-1.525.138-.582-.006-.686-.01-.853-.042-.57-.107-1.022-.334-1.35-.68-.264-.28-.385-.535-.45-.946-.03-.192.025-.509.137-.776.136-.326.488-.73.836-.963.403-.269.934-.46 1.422-.512.187-.02.586-.02.773-.002zm-5.503-11a1.653 1.653 0 0 0-.683.298C5.617.74 5.173 1.666 4.985 2.819c-.07.436-.119 1.04-.119 1.503 0 .544.064 1.24.155 1.721.02.107.031.202.023.208a8.12 8.12 0 0 1-.187.152 5.324 5.324 0 0 0-.949 1.02 5.49 5.49 0 0 0-.94 2.339 6.625 6.625 0 0 0-.023 1.357c.091.78.325 1.438.727 2.04l.13.195-.037.064c-.269.452-.498 1.105-.605 1.732-.084.496-.095.629-.095 1.294 0 .67.009.803.088 1.266.095.555.288 1.143.503 1.534.071.128.243.393.264.407.007.003-.014.067-.046.141a7.405 7.405 0 0 0-.548 1.873c-.062.417-.071.552-.071.991 0 .56.031.832.148 1.279L3.42 24h1.478l-.05-.091c-.297-.552-.325-1.575-.068-2.597.117-.472.25-.819.498-1.296l.148-.29v-.177c0-.165-.003-.184-.057-.293a.915.915 0 0 0-.194-.25 1.74 1.74 0 0 1-.385-.543c-.424-.92-.506-2.286-.208-3.451.124-.486.329-.918.544-1.154a.787.787 0 0 0 .223-.531c0-.195-.07-.355-.224-.522a3.136 3.136 0 0 1-.817-1.729c-.14-.96.114-2.005.69-2.834.563-.814 1.353-1.336 2.237-1.475.199-.033.57-.028.776.01.226.04.367.028.512-.041.179-.085.268-.19.374-.431.093-.215.165-.333.36-.576.234-.29.46-.489.822-.729.413-.27.884-.467 1.352-.561.17-.035.25-.04.569-.04.319 0 .398.005.569.04a4.07 4.07 0 0 1 1.914.997c.117.109.398.457.488.602.034.057.095.177.132.267.105.241.195.346.374.43.14.068.286.082.503.045.343-.058.607-.053.943.016 1.144.23 2.14 1.173 2.581 2.437.385 1.108.276 2.267-.296 3.153-.097.15-.193.27-.333.419-.301.322-.301.722-.001 1.053.493.539.801 1.866.708 3.036-.062.772-.26 1.463-.533 1.854a2.096 2.096 0 0 1-.224.258.916.916 0 0 0-.194.25c-.054.109-.057.128-.057.293v.178l.148.29c.248.476.38.823.498 1.295.253 1.008.231 2.01-.059 2.581a.845.845 0 0 0-.044.098c0 .006.329.009.732.009h.73l.02-.074.036-.134c.019-.076.057-.3.088-.516.029-.217.029-1.016 0-1.258-.11-.875-.295-1.57-.597-2.226-.032-.074-.053-.138-.046-.141.008-.005.057-.074.108-.152.376-.569.607-1.284.724-2.228.031-.26.031-1.378 0-1.628-.083-.645-.182-1.082-.348-1.525a6.083 6.083 0 0 0-.329-.7l-.038-.064.131-.194c.402-.604.636-1.262.727-2.04a6.625 6.625 0 0 0-.024-1.358 5.512 5.512 0 0 0-.939-2.339 5.325 5.325 0 0 0-.95-1.02 8.097 8.097 0 0 1-.186-.152.692.692 0 0 1 .023-.208c.208-1.087.201-2.443-.017-3.503-.19-.924-.535-1.658-.98-2.082-.354-.338-.716-.482-1.15-.455-.996.059-1.8 1.205-2.116 3.01a6.805 6.805 0 0 0-.097.726c0 .036-.007.066-.015.066a.96.96 0 0 1-.149-.078A4.857 4.857 0 0 0 12 3.03c-.832 0-1.687.243-2.456.698a.958.958 0 0 1-.148.078c-.008 0-.015-.03-.015-.066a6.71 6.71 0 0 0-.097-.725C8.997 1.392 8.337.319 7.46.048a2.096 2.096 0 0 0-.585-.041Zm.293 1.402c.248.197.523.759.682 1.388.03.113.06.244.069.292.007.047.026.152.041.233.067.365.098.76.102 1.24l.002.475-.12.175-.118.178h-.278c-.324 0-.646.041-.954.124l-.238.06c-.033.007-.038-.003-.057-.144a8.438 8.438 0 0 1 .016-2.323c.124-.788.413-1.501.696-1.711.067-.05.079-.049.157.013zm9.825-.012c.17.126.358.46.498.888.28.854.36 2.028.212 3.145-.019.14-.024.151-.057.144l-.238-.06a3.693 3.693 0 0 0-.954-.124h-.278l-.119-.178-.119-.175.002-.474c.004-.669.066-1.19.214-1.772.157-.623.434-1.185.68-1.382.078-.062.09-.063.159-.012z',
  DeepSeek:       'M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z',
  // Kimi (Moonshot AI) logo (LobeHub)
  Kimi:           ['M21.846 0a1.923 1.923 0 110 3.846H20.15a.226.226 0 01-.227-.226V1.923C19.923.861 20.784 0 21.846 0z', 'M11.065 11.199l7.257-7.2c.137-.136.06-.41-.116-.41H14.3a.164.164 0 00-.117.051l-7.82 7.756c-.122.12-.302.013-.302-.179V3.82c0-.127-.083-.23-.185-.23H3.186c-.103 0-.186.103-.186.23V19.77c0 .128.083.23.186.23h2.69c.103 0 .186-.102.186-.23v-3.25c0-.069.025-.135.069-.178l2.424-2.406a.158.158 0 01.205-.023l6.484 4.772a7.677 7.677 0 003.453 1.283c.108.012.2-.095.2-.23v-3.06c0-.117-.07-.212-.164-.227a5.028 5.028 0 01-2.027-.807l-5.613-4.064c-.117-.078-.132-.279-.028-.381z'],
  // Qwen (Alibaba) logo (LobeHub)
  Qwen:           'M12.604 1.34c.393.69.784 1.382 1.174 2.075a.18.18 0 00.157.091h5.552c.174 0 .322.11.446.327l1.454 2.57c.19.337.24.478.024.837-.26.43-.513.864-.76 1.3l-.367.658c-.106.196-.223.28-.04.512l2.652 4.637c.172.301.111.494-.043.77-.437.785-.882 1.564-1.335 2.34-.159.272-.352.375-.68.37-.777-.016-1.552-.01-2.327.016a.099.099 0 00-.081.05 575.097 575.097 0 01-2.705 4.74c-.169.293-.38.363-.725.364-.997.003-2.002.004-3.017.002a.537.537 0 01-.465-.271l-1.335-2.323a.09.09 0 00-.083-.049H4.982c-.285.03-.553-.001-.805-.092l-1.603-2.77a.543.543 0 01-.002-.54l1.207-2.12a.198.198 0 000-.197 550.951 550.951 0 01-1.875-3.272l-.79-1.395c-.16-.31-.173-.496.095-.965.465-.813.927-1.625 1.387-2.436.132-.234.304-.334.584-.335a338.3 338.3 0 012.589-.001.124.124 0 00.107-.063l2.806-4.895a.488.488 0 01.422-.246c.524-.001 1.053 0 1.583-.006L11.704 1c.341-.003.724.032.9.34zm-3.432.403a.06.06 0 00-.052.03L6.254 6.788a.157.157 0 01-.135.078H3.253c-.056 0-.07.025-.041.074l5.81 10.156c.025.042.013.062-.034.063l-2.795.015a.218.218 0 00-.2.116l-1.32 2.31c-.044.078-.021.118.068.118l5.716.008c.046 0 .08.02.104.061l1.403 2.454c.046.081.092.082.139 0l5.006-8.76.783-1.382a.055.055 0 01.096 0l1.424 2.53a.122.122 0 00.107.062l2.763-.02a.04.04 0 00.035-.02.041.041 0 000-.04l-2.9-5.086a.108.108 0 010-.113l.293-.507 1.12-1.977c.024-.041.012-.062-.035-.062H9.2c-.059 0-.073-.026-.043-.077l1.434-2.505a.107.107 0 000-.114L9.225 1.774a.06.06 0 00-.053-.031zm6.29 8.02c.046 0 .058.02.034.06l-.832 1.465-2.613 4.585a.056.056 0 01-.05.029.058.058 0 01-.05-.029L8.498 9.841c-.02-.034-.01-.052.028-.054l.216-.012 6.722-.012z',
  // Flux (Black Forest Labs) logo (SimpleIcons)
  Flux:           'M11.402 23.747c.154.075.306.154.454.238.181.038.37.004.525-.097l.386-.251c-1.242-.831-2.622-1.251-3.998-1.602l2.633 1.712Zm-7.495-5.783a8.088 8.088 0 0 1-.222-.236.696.696 0 0 0 .112 1.075l2.304 1.498c1.019.422 2.085.686 3.134.944 1.636.403 3.2.79 4.554 1.728l.697-.453c-1.541-1.158-3.327-1.602-5.065-2.03-2.039-.503-3.965-.977-5.514-2.526Zm1.414-1.322-.665.432c.023.024.044.049.068.073 1.702 1.702 3.825 2.225 5.877 2.731 1.778.438 3.469.856 4.9 1.982l.682-.444c-1.612-1.357-3.532-1.834-5.395-2.293-2.019-.497-3.926-.969-5.467-2.481Zm7.502 2.084c1.596.412 3.096.904 4.367 2.036l.67-.436c-1.484-1.396-3.266-1.953-5.037-2.403v.803Zm.698-2.337a64.695 64.695 0 0 1-.698-.174v.802l.512.127c2.039.503 3.965.978 5.514 2.526l.007.009.663-.431c-.041-.042-.079-.086-.121-.128-1.702-1.701-3.824-2.225-5.877-2.731Zm-.698-1.928v.816c.624.19 1.255.347 1.879.501 2.039.502 3.965.977 5.513 2.526.077.077.153.157.226.239a.704.704 0 0 0-.238-.911l-3.064-1.992c-.744-.245-1.502-.433-2.251-.618a31.436 31.436 0 0 1-2.065-.561Zm-1.646 3.049c-1.526-.4-2.96-.888-4.185-1.955l-.674.439c1.439 1.326 3.151 1.88 4.859 2.319v-.803Zm0-1.772a8.543 8.543 0 0 1-2.492-1.283l-.686.446c.975.804 2.061 1.293 3.178 1.655v-.818Zm0-1.946a7.59 7.59 0 0 1-.776-.453l-.701.456c.462.337.957.627 1.477.865v-.868Zm3.533.269-1.887-1.226v.581c.614.257 1.244.473 1.887.645Zm5.493-8.863L12.381.112a.705.705 0 0 0-.762 0L3.797 5.198a.698.698 0 0 0 0 1.171l7.38 4.797V7.678a.414.414 0 0 0-.412-.412h-.543a.413.413 0 0 1-.356-.617l1.777-3.079a.412.412 0 0 1 .714 0l1.777 3.079a.413.413 0 0 1-.356.617h-.543a.414.414 0 0 0-.412.412v3.488l7.38-4.797a.7.7 0 0 0 0-1.171Z',
  // ByteDance logo (SimpleIcons)
  ByteDance:      'M19.8772 1.4685L24 2.5326v18.9426l-4.1228 1.0563V1.4685zm-13.3481 9.428l4.115 1.0641v8.9786l-4.115 1.0642v-11.107zM0 2.572l4.115 1.0642v16.7354L0 21.428V2.572zm17.4553 5.6205v11.107l-4.1228-1.0642V9.2568l4.1228-1.0642z',
}

function Logo({ provider, color, size = 22 }: { provider: string; color: string; size?: number }) {
  const paths = PROVIDER_PATHS[provider]

  if (!paths) {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: size, height: size, flexShrink: 0,
        borderRadius: '50%',
        backgroundColor: color + '18', border: `1.5px solid ${color}35`,
        fontSize: Math.round(size * 0.44), fontWeight: 700, color,
        fontFamily: 'var(--font-space-grotesk, sans-serif)',
        letterSpacing: '-0.3px',
      }}>
        {provider[0]}
      </span>
    )
  }
  const pathArr = Array.isArray(paths) ? paths : [paths]
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} fillRule="evenodd" style={{ flexShrink: 0 }}>
      {pathArr.map((d, i) => <path key={i} d={d} />)}
    </svg>
  )
}

// ── Capability badges ────────────────────────────────────────────────────
const CAP_META: Record<Capability, { label: string; bg: string; text: string }> = {
  vision:      { label: 'Vision',   bg: 'rgba(59,130,246,0.12)',  text: '#3b82f6' },
  tools:       { label: 'Tools',    bg: 'rgba(34,197,94,0.12)',   text: '#16a34a' },
  reasoning:   { label: 'Thinking', bg: 'rgba(168,85,247,0.12)',  text: '#9333ea' },
  audio:       { label: 'Audio',    bg: 'rgba(234,179,8,0.12)',   text: '#ca8a04' },
  embedding:   { label: 'Embed',    bg: 'rgba(99,102,241,0.12)',  text: '#6366f1' },
  'image-gen': { label: 'Image',    bg: 'rgba(236,72,153,0.12)', text: '#db2777' },
  'video-gen': { label: 'Video',    bg: 'rgba(239,68,68,0.12)',  text: '#dc2626' },
}

function CapBadge({ cap }: { cap: Capability }) {
  const m = CAP_META[cap]
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide whitespace-nowrap"
      style={{ backgroundColor: m.bg, color: m.text }}>
      {m.label}
    </span>
  )
}

// ── Pricing type ─────────────────────────────────────────────────────────
const PRICING_META: Record<PricingType, { label: string; short: string; bg: string; text: string }> = {
  'token':       { label: 'Pay per Token',   short: 'Token',  bg: 'rgba(15,118,110,0.10)', text: '#0f766e' },
  'per-image':   { label: 'Pay per Image',   short: 'Image',  bg: 'rgba(147,51,234,0.10)', text: '#9333ea' },
  'per-video':   { label: 'Pay per Video',   short: 'Video',  bg: 'rgba(220,38,38,0.10)',  text: '#dc2626' },
  'per-request': { label: 'Pay per Request', short: 'Req',    bg: 'rgba(180,83,9,0.10)',   text: '#b45309' },
}

// ── Copy button ──────────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [text])
  return (
    <button onClick={copy} title="Copy model ID"
      className="opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity ml-1 shrink-0 text-xs"
      style={{ color: 'var(--muted-text)' }}>
      {copied ? '✓' : '⎘'}
    </button>
  )
}

function fmt(n: number) {
  if (n === 0) return '—'
  if (n < 0.01) return `$${n.toFixed(4)}`
  if (n < 1)    return `$${n.toFixed(3)}`
  return `$${n.toFixed(2)}`
}

// ── View toggle icons ────────────────────────────────────────────────────
function GridIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke={active ? 'var(--foreground)' : 'var(--muted-text)'} strokeWidth="1.5">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  )
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      stroke={active ? 'var(--foreground)' : 'var(--muted-text)'} strokeWidth="1.5">
      <line x1="5" y1="4" x2="14" y2="4" />
      <line x1="5" y1="8" x2="14" y2="8" />
      <line x1="5" y1="12" x2="14" y2="12" />
      <circle cx="2" cy="4" r="1" fill={active ? 'var(--foreground)' : 'var(--muted-text)'} stroke="none" />
      <circle cx="2" cy="8" r="1" fill={active ? 'var(--foreground)' : 'var(--muted-text)'} stroke="none" />
      <circle cx="2" cy="12" r="1" fill={active ? 'var(--foreground)' : 'var(--muted-text)'} stroke="none" />
    </svg>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────
export default function ModelsPage() {
  return <AuthGuard><ModelsContent /></AuthGuard>
}

function ModelsContent() {
  const { apiKey } = useDashboard()
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [filterProvider, setFilterProvider] = useState<string>('All')
  const [filterCap, setFilterCap] = useState<Capability | 'All'>('All')
  const [filterType, setFilterType] = useState<PricingType | 'All'>('All')
  const [filterNew, setFilterNew] = useState(false)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'name' | 'price-asc' | 'price-desc'>('name')

  const { data } = useSWR(
    apiKey ? ['/api/dashboard/models', apiKey] : null,
    ([url, key]) => fetch(url, { headers: { 'x-api-key': key } }).then(r => r.json()),
    { revalidateOnFocus: false }
  )
  const availableSet = useMemo(() => new Set<string>(data?.models ?? []), [data])
  const allEntries = useMemo(() => Object.entries(MODEL_CATALOG), [])

  const rows = useMemo(() => {
    return allEntries
      .filter(([id, info]) => {
        if (filterProvider !== 'All' && info.provider !== filterProvider) return false
        if (filterCap !== 'All' && !info.caps.includes(filterCap as Capability)) return false
        if (filterType !== 'All' && info.pricingType !== filterType) return false
        if (filterNew && !info.new) return false
        if (search) {
          const q = search.toLowerCase()
          return id.toLowerCase().includes(q) || info.provider.toLowerCase().includes(q) || (info.description ?? '').toLowerCase().includes(q)
        }
        return true
      })
      .sort(([aId, a], [bId, b]) => {
        if (sort === 'price-asc') return (a.input ?? a.pricePerRequest ?? 0) - (b.input ?? b.pricePerRequest ?? 0)
        if (sort === 'price-desc') return (b.input ?? b.pricePerRequest ?? 0) - (a.input ?? a.pricePerRequest ?? 0)
        return aId.localeCompare(bId)
      })
  }, [allEntries, filterProvider, filterCap, filterType, filterNew, search, sort])

  const tokenCount = allEntries.filter(([, m]) => m.pricingType === 'token').length
  const imageCount = allEntries.filter(([, m]) => m.pricingType !== 'token').length

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase mb-1.5"
          style={{ color: '#FF4F00', letterSpacing: '0.12em', textShadow: '0 0 10px rgba(255,79,0,0.25)' }}>
          Model Marketplace
        </p>
        <div className="flex items-end gap-4 flex-wrap">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-0.04em' }}>
            {allEntries.length} Models
          </h1>
          <p className="text-sm mb-0.5" style={{ color: 'var(--muted-text)' }}>
            {tokenCount} token-based · {imageCount} image/video
            {availableSet.size > 0 && ` · ${availableSet.size} active with your key`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-2.5 mb-5">
        {/* Search + sort + view toggle */}
        <div className="flex flex-wrap gap-2 items-center">
          <input type="text" placeholder="Search models..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-9 px-3.5 rounded-lg text-sm border outline-none"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)', minWidth: '180px', maxWidth: '260px' }}
          />
          <div className="flex items-center gap-1 ml-auto flex-wrap">
            <span className="text-xs mr-0.5" style={{ color: 'var(--muted-text)' }}>Sort:</span>
            <button onClick={() => setSort('name')}
              className="h-8 px-2.5 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: sort === 'name' ? 'var(--foreground)' : 'var(--surface)',
                color: sort === 'name' ? 'var(--background)' : 'var(--muted-text)',
                border: `1px solid ${sort === 'name' ? 'var(--foreground)' : 'var(--border)'}`,
              }}>
              Name
            </button>
            <button onClick={() => setSort(s => s === 'price-asc' ? 'price-desc' : 'price-asc')}
              className="h-8 px-2.5 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: sort !== 'name' ? 'var(--foreground)' : 'var(--surface)',
                color: sort !== 'name' ? 'var(--background)' : 'var(--muted-text)',
                border: `1px solid ${sort !== 'name' ? 'var(--foreground)' : 'var(--border)'}`,
              }}>
              Price {sort === 'price-desc' ? '↓' : '↑'}
            </button>
            <button onClick={() => setFilterNew(v => !v)}
              className="h-8 px-2.5 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: filterNew ? 'rgba(34,197,94,0.12)' : 'var(--surface)',
                color: filterNew ? '#16a34a' : 'var(--muted-text)',
                border: `1px solid ${filterNew ? 'rgba(34,197,94,0.4)' : 'var(--border)'}`,
              }}>
              New
            </button>
            {/* View mode toggle */}
            <div className="flex items-center rounded-lg border overflow-hidden ml-1"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className="h-8 w-9 flex items-center justify-center transition-colors"
                style={{ backgroundColor: viewMode === 'grid' ? 'var(--surface-alt, rgba(0,0,0,0.05))' : 'transparent' }}
                title="Grid view"
              >
                <GridIcon active={viewMode === 'grid'} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className="h-8 w-9 flex items-center justify-center transition-colors"
                style={{ backgroundColor: viewMode === 'table' ? 'var(--surface-alt, rgba(0,0,0,0.05))' : 'transparent' }}
                title="List view"
              >
                <ListIcon active={viewMode === 'table'} />
              </button>
            </div>
          </div>
        </div>

        {/* Pricing type */}
        <div className="flex flex-wrap gap-1.5">
          {(['All', 'token', 'per-image', 'per-video', 'per-request'] as const).map(t => {
            const active = filterType === t
            const meta = t !== 'All' ? PRICING_META[t] : null
            return (
              <button key={t} onClick={() => setFilterType(t)}
                className="h-8 px-3 rounded-lg text-xs font-semibold transition-all"
                style={{
                  backgroundColor: active ? (meta?.bg ?? 'var(--foreground)') : 'var(--surface)',
                  color: active ? (meta?.text ?? 'var(--background)') : 'var(--muted-text)',
                  border: `1px solid ${active ? ((meta?.text ?? 'var(--foreground)') + '66') : 'var(--border)'}`,
                }}>
                {t === 'All' ? 'All Types' : meta!.label}
              </button>
            )
          })}
        </div>

        {/* Provider tabs */}
        <div className="flex flex-wrap gap-1.5">
          {(['All', ...PROVIDERS] as string[]).map(p => {
            const color = p === 'All' ? undefined : Object.values(MODEL_CATALOG).find(m => m.provider === p)?.providerColor
            const active = filterProvider === p
            return (
              <button key={p} onClick={() => setFilterProvider(p)}
                className="h-8 px-3 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
                style={{
                  backgroundColor: active ? (color ?? '#FF4F00') + '18' : 'var(--surface)',
                  color: active ? (color ?? '#FF4F00') : 'var(--muted-text)',
                  border: `1px solid ${active ? (color ?? '#FF4F00') + '55' : 'var(--border)'}`,
                }}>
                {color && <Logo provider={p} color={active ? (color ?? '#FF4F00') : 'var(--muted-text)'} size={14} />}
                {p}
              </button>
            )
          })}
        </div>

        {/* Capability filter */}
        <div className="flex flex-wrap gap-1.5">
          {(['All', ...Object.keys(CAP_META)] as string[]).map(key => {
            const active = filterCap === key
            const meta = key !== 'All' ? CAP_META[key as Capability] : null
            return (
              <button key={key} onClick={() => setFilterCap(key as Capability | 'All')}
                className="h-8 px-3 rounded-lg text-xs font-medium transition-all"
                style={{
                  backgroundColor: active ? (meta?.bg ?? 'var(--foreground)') : 'var(--surface)',
                  color: active ? (meta?.text ?? 'var(--background)') : 'var(--muted-text)',
                  border: `1px solid ${active ? ((meta?.text ?? 'var(--foreground)') + '66') : 'var(--border)'}`,
                }}>
                {key === 'All' ? 'All Capabilities' : meta!.label}
              </button>
            )
          })}
        </div>
      </div>

      <p className="text-xs mb-4" style={{ color: 'var(--muted-text)' }}>
        Showing {rows.length} of {allEntries.length} models
      </p>

      {/* ── Grid view ─────────────────────────────────────────────────── */}
      {viewMode === 'grid' && (
        rows.length === 0 ? (
          <div className="py-16 text-center text-sm" style={{ color: 'var(--muted-text)' }}>
            No models match your filters.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1px',
            backgroundColor: 'var(--border)',
          }}>
            {rows.map(([id, info]) => {
              const isPerReq = info.pricingType !== 'token'
              const priceMeta = PRICING_META[info.pricingType]
              return (
                <div key={id}
                  className="group flex flex-col p-5 transition-colors"
                  style={{ backgroundColor: 'var(--surface)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-alt, rgba(0,0,0,0.03))')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--surface)')}
                >
                  {/* Provider row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: info.providerColor + '12' }}>
                        <Logo provider={info.provider} color={info.providerColor} size={20} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: info.providerColor, letterSpacing: '0.08em' }}>
                        {info.provider}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {info.featured && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: 'rgba(255,79,0,0.12)', color: '#FF4F00' }}>Featured</span>
                      )}
                      {info.new && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#16a34a' }}>New</span>
                      )}
                    </div>
                  </div>

                  {/* Model name */}
                  <div className="flex items-start gap-1 mb-2">
                    <span className="text-sm font-mono font-semibold leading-snug"
                      style={{ color: 'var(--foreground)', wordBreak: 'break-all' }}>
                      {id}
                    </span>
                    <CopyButton text={id} />
                  </div>

                  {/* Description */}
                  {info.description && (
                    <p className="text-xs leading-relaxed mb-3 flex-1"
                      style={{ color: 'var(--muted-text)' }}>
                      {info.description}
                    </p>
                  )}

                  {/* Price chip */}
                  <code className="text-xs font-mono px-2.5 py-1.5 rounded block border mb-3"
                    style={{
                      backgroundColor: 'var(--background)',
                      borderColor: 'var(--border)',
                      color: info.providerColor,
                    }}>
                    {isPerReq
                      ? `${fmt(info.pricePerRequest ?? 0)} ${info.priceUnit ?? ''}`
                      : `In: ${fmt(info.input ?? 0)}  ·  Out: ${fmt(info.output ?? 0)}${info.context ? `  ·  ${info.context}` : ''}`
                    }
                  </code>

                  {/* Bottom row: pricing type + capabilities */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap"
                      style={{ backgroundColor: priceMeta.bg, color: priceMeta.text }}>
                      {priceMeta.short}
                    </span>
                    {info.caps.map(c => <CapBadge key={c} cap={c} />)}
                  </div>
                </div>
              )
            })}
          </div>
        )
      )}

      {/* ── Table view ────────────────────────────────────────────────── */}
      {viewMode === 'table' && (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
          <div className="grid text-xs font-semibold uppercase px-5 py-2.5 border-b"
            style={{
              gridTemplateColumns: '2.6fr 110px 110px 110px 80px 1fr',
              color: 'var(--muted-text)', letterSpacing: '0.06em',
              borderColor: 'var(--border)', backgroundColor: 'var(--surface-alt, rgba(0,0,0,0.03))',
            }}>
            <span>Model</span>
            <span>Provider</span>
            <span>Input /1M</span>
            <span>Output /1M</span>
            <span>Context</span>
            <span>Capabilities</span>
          </div>

          {rows.length === 0 ? (
            <div className="px-5 py-16 text-center text-sm" style={{ color: 'var(--muted-text)' }}>
              No models match your filters.
            </div>
          ) : (
            rows.map(([id, info]) => {
              const isPerReq = info.pricingType !== 'token'
              const priceMeta = PRICING_META[info.pricingType]
              return (
                <div key={id}
                  className="group grid items-center px-5 py-3 border-b last:border-0 transition-colors"
                  style={{ gridTemplateColumns: '2.6fr 110px 110px 110px 80px 1fr', borderColor: 'var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-alt, rgba(0,0,0,0.03))')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {/* Model name + type badge + description */}
                  <div className="min-w-0 pr-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-mono font-medium"
                        style={{ color: 'var(--foreground)', wordBreak: 'break-all' }}>
                        {id}
                      </span>
                      <CopyButton text={id} />
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap"
                        style={{ backgroundColor: priceMeta.bg, color: priceMeta.text }}>
                        {priceMeta.short}
                      </span>
                      {info.featured && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: 'rgba(255,79,0,0.12)', color: '#FF4F00' }}>Featured</span>
                      )}
                      {info.new && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#16a34a' }}>New</span>
                      )}
                      {info.description && (
                        <span className="text-[11px] hidden sm:inline truncate"
                          style={{ color: 'var(--muted-text)' }}>{info.description}</span>
                      )}
                    </div>
                  </div>

                  {/* Provider */}
                  <div className="flex items-center gap-2 min-w-0">
                    <Logo provider={info.provider} color={info.providerColor} size={20} />
                    <span className="text-sm truncate" style={{ color: 'var(--foreground)' }}>{info.provider}</span>
                  </div>

                  {/* Input price */}
                  <span className="text-sm font-medium" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--foreground)' }}>
                    {isPerReq
                      ? <>{fmt(info.pricePerRequest ?? 0)}<span className="text-[10px] ml-0.5" style={{ color: 'var(--muted-text)' }}>{info.priceUnit}</span></>
                      : fmt(info.input ?? 0)
                    }
                  </span>

                  {/* Output price */}
                  <span className="text-sm" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--foreground)' }}>
                    {isPerReq ? <span style={{ color: 'var(--muted-text)' }}>—</span> : fmt(info.output ?? 0)}
                  </span>

                  {/* Context */}
                  <span className="text-xs font-mono" style={{ color: 'var(--muted-text)' }}>
                    {info.context ?? '—'}
                  </span>

                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-1">
                    {info.caps.map(c => <CapBadge key={c} cap={c} />)}
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
