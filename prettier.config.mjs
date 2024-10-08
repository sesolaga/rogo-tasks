/** @type {import('prettier').Config} */
const prettierConfig = {
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-embed', 'prettier-plugin-sql'],
}

/** @type {import('prettier-plugin-embed').PrettierPluginEmbedOptions} */
const prettierPluginEmbedConfig = {
  embeddedSqlTags: ['client.sql', 'sql'],
}

/** @type {import('prettier-plugin-sql').SqlBaseOptions} */
const prettierPluginSqlConfig = {
  language: 'postgresql',
  keywordCase: 'upper',
}

const config = {
  ...prettierConfig,
  ...prettierPluginEmbedConfig,
  ...prettierPluginSqlConfig,
}

export default config;
