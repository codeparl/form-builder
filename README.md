# Vue Form Builder

[![npm version](https://badge.fury.io/js/form-builder.svg)](https://badge.fury.io/js/form-builder)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful, flexible, and customizable form builder component library for Vue 3 applications. Build dynamic forms with drag-and-drop functionality, multiple field types, internationalization support, and seamless integration with your existing Vue ecosystem.

## ✨ Features

- 🚀 **Vue 3 + TypeScript** - Built with modern Vue 3 Composition API and full TypeScript support
- 🎯 **Drag & Drop** - Intuitive drag-and-drop interface for building forms
- 📝 **Multiple Field Types** - Text, Number, Textarea, Select, Checkbox, Radio, Date, File, Button, Heading, Paragraph, Hidden
- 🌍 **Internationalization** - Multi-language support (English, French, Spanish, Arabic, Russian, Chinese)
- 🎨 **Customizable Styling** - Built with Tailwind CSS and Naive UI components
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 💾 **Export/Import** - Save and load form configurations as JSON
- 🧩 **Component-based** - Easy to integrate with existing Vue applications
- 🔧 **Highly Configurable** - Extensive customization options
- 📊 **Form Rendering** - Built-in form renderer component

## 📦 Installation

### NPM

```bash
npm install form-builder
```

### Yarn

```bash
yarn add form-builder
```

### PNPM

```bash
pnpm add form-builder
```

## 🚀 Quick Start

### Basic Usage

```vue
<template>
  <FormBuilder @save="handleSave" />
</template>

<script setup lang="ts">
import { FormBuilder } from 'form-builder'

const handleSave = sections => {
  console.log('Form saved:', sections)
}
</script>
```

### With Options

```vue
<template>
  <FormBuilder :options="formBuilderOptions" :sections="initialSections" @save="handleSave" />
</template>

<script setup lang="ts">
import { FormBuilder } from 'form-builder'

const formBuilderOptions = {
  language: 'en',
  allowExport: true,
  allowImport: true,
}

const initialSections = [
  {
    id: 'section-1',
    title: 'Personal Information',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Full Name',
        required: true,
        placeholder: 'Enter your full name',
      },
    ],
  },
]

const handleSave = sections => {
  console.log('Form saved:', sections)
}
</script>
```

### Form Rendering

```vue
<template>
  <div>
    <h2>Form Preview</h2>
    <FormRenderer :sections="formSections" @update="handleFormUpdate" />
  </div>
</template>

<script setup lang="ts">
import { FormRenderer } from 'form-builder'

const handleFormUpdate = formData => {
  console.log('Form data updated:', formData)
}
</script>
```

## 📚 API Reference

### FormBuilder Component

#### Props

| Prop       | Type                 | Default | Description                                |
| ---------- | -------------------- | ------- | ------------------------------------------ |
| `options`  | `FormBuilderOptions` | `{}`    | Configuration options for the form builder |
| `sections` | `FormSection[]`      | `[]`    | Initial form sections                      |

#### Events

| Event  | Payload         | Description                |
| ------ | --------------- | -------------------------- |
| `save` | `FormSection[]` | Emitted when form is saved |

#### FormBuilderOptions

```typescript
interface FormBuilderOptions {
  language?: 'en' | 'fr' | 'es' | 'ar' | 'ru' | 'zh'
  allowExport?: boolean
  allowImport?: boolean
}
```

### FormRenderer Component

#### Props

| Prop       | Type            | Default | Description             |
| ---------- | --------------- | ------- | ----------------------- |
| `sections` | `FormSection[]` | `[]`    | Form sections to render |

#### Events

| Event    | Payload               | Description                    |
| -------- | --------------------- | ------------------------------ |
| `update` | `Record<string, any>` | Emitted when form data changes |

### FormSection Interface

```typescript
interface FormSection {
  id: string
  title?: string
  fields: FormField[]
  editable?: boolean
}
```

### FormField Interface

```typescript
interface FormField {
  id: string
  type: string
  subType?: string
  name: string
  label: string
  required?: boolean
  value?: any
  editable?: boolean
  category?: FieldCategory
  class?: string
  placeholder?: string
  helpText?: string
  min?: number
  max?: number
  step?: number
  options?: SelectOption[]
  multiple?: boolean
}
```

## 🎯 Available Field Types

| Field Type  | Description            | Icon |
| ----------- | ---------------------- | ---- |
| `text`      | Single-line text input | 📝   |
| `number`    | Numeric input          | 🔢   |
| `textarea`  | Multi-line text input  | 📄   |
| `select`    | Dropdown selection     | 📋   |
| `checkbox`  | Checkbox input         | ☑️   |
| `radio`     | Radio button group     | 🔘   |
| `date`      | Date picker            | 📅   |
| `file`      | File upload            | 📎   |
| `button`    | Action button          | 🔘   |
| `heading`   | Section heading        | 📰   |
| `paragraph` | Text paragraph         | 📖   |
| `hidden`    | Hidden input field     | 👁️‍🗨️   |

## 🌍 Internationalization

The library supports multiple languages out of the box:

- 🇺🇸 English (en)
- 🇫🇷 French (fr)
- 🇪🇸 Spanish (es)
- 🇸🇦 Arabic (ar)
- 🇷🇺 Russian (ru)
- 🇨🇳 Chinese (zh)

### Custom Language

```typescript
import { FormBuilder } from 'form-builder'

// Add custom language
const customMessages = {
  field: {
    text: 'Champ de texte',
    button: 'Bouton',
    // ... other translations
  }
}

// Use in component
<FormBuilder :options="{ language: 'custom' }" />
```

## 🎨 Styling & Theming

The library uses Tailwind CSS for styling and Naive UI for components. You can customize the appearance by:

### Custom CSS

```css
/* Override default styles */
.form-builder {
  /* Your custom styles */
}

.form-builder .field-item {
  /* Custom field styling */
}
```

### Theme Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'form-builder-primary': '#your-color',
      },
    },
  },
}
```

## 📱 Examples

### Basic Form Builder

```vue
<template>
  <div class="container mx-auto p-4">
    <FormBuilder
      :options="{
        language: 'en',
        allowExport: true,
        allowImport: true,
      }"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { FormBuilder } from 'form-builder'

const handleSave = sections => {
  // Handle form save
  console.log('Saved sections:', sections)
}
</script>
```

### Advanced Usage with Validation

```vue
<template>
  <div class="container mx-auto p-4">
    <FormBuilder :options="builderOptions" :sections="initialSections" @save="handleSave" />

    <div class="mt-8">
      <h3 class="text-lg font-semibold mb-4">Form Preview</h3>
      <FormRenderer :sections="formSections" @update="handleFormUpdate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormBuilder, FormRenderer } from 'form-builder'
import { ref } from 'vue'

const formSections = ref([])

const builderOptions = {
  language: 'en',
  allowExport: true,
  allowImport: true,
}

const initialSections = [
  {
    id: 'contact-info',
    title: 'Contact Information',
    fields: [
      {
        id: 'email',
        type: 'text',
        label: 'Email Address',
        required: true,
        placeholder: 'Enter your email',
      },
      {
        id: 'phone',
        type: 'text',
        label: 'Phone Number',
        placeholder: 'Enter your phone number',
      },
    ],
  },
]

const handleSave = sections => {
  formSections.value = sections
  console.log('Form saved:', sections)
}

const handleFormUpdate = formData => {
  console.log('Form data:', formData)
}
</script>
```

## 🔧 Development

### Prerequisites

- Node.js 16+
- Vue 3.5+
- TypeScript 5+

### Setup

```bash
# Clone the repository
git clone https://github.com/codeparl/form-builder.git
cd form-builder

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint
```

### Project Structure

```
src/
├── components/          # Vue components
│   ├── FormBuilder.vue  # Main form builder component
│   ├── FormRenderer.vue # Form rendering component
│   ├── fields/          # Field components
│   └── ...
├── composable/          # Vue composables
├── config/             # Configuration files
├── css/                # Stylesheets
├── data/               # Data and constants
├── i18n/               # Internationalization
├── types/              # TypeScript definitions
└── index.ts            # Main entry point
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - The progressive JavaScript framework
- [Naive UI](https://www.naiveui.com/) - Vue component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [SortableJS](https://sortablejs.github.io/Sortable/) - Drag and drop library

## 📞 Support

- 📧 **Email**: <hassan.mugabo@supernova-corp.com>
- 🐛 **Issues**: [GitHub Issues](https://github.com/codeparl/form-builder/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/codeparl/form-builder/discussions)

## 🔄 Changelog

See [CHANGES.md](CHANGES.md) for a list of changes and version history.

---

**Made with ❤️ by [Hassan Mugabo](https://github.com/codeparl)**
