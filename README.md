# 🏥 Proyecto Frontend Angular - Diagnóstico Médico con IA

Este es el frontend de una plataforma para el diagnóstico médico con IA, desarrollada con **Angular 17** y **Material Design**, y documentada con **JSDoc** y **Compodoc**.

---

## 📌 **Tecnologías Utilizadas**
- 🅰️ **Angular 17** - Framework frontend.
- 🎨 **Angular Material** - Diseño de UI.
- 🔄 **RxJS** - Manejo de datos reactivos.
- 🏥 **Supabase** - Autenticación y base de datos en la nube.
- 📊 **ApexCharts y Chart.js** - Visualización de datos médicos.
- 🗂 **FileSaver.js y HTML2Canvas** - Generación de informes en PDF.
- 📄 **JSDoc & Compodoc** - Documentación de código.

---

## 📺 **Estructura del Proyecto**
```sh
frontend-proyecto-cancer/
│── src/
│   ├── app/
│   │   ├── add-diagnostic-dialog/       # Componente para añadir diagnósticos
│   │   ├── add-patient-dialog/          # Componente para añadir pacientes
│   │   ├── comparison/                   # Comparación de diagnósticos IA
│   │   ├── diagnostic-ia/                 # Diagnóstico basado en IA
│   │   ├── layouts/                      # Estructuras generales de UI
│   │   ├── loader/                       # Componente de carga
│   │   ├── pages/
│   │   ├── services/                     # Servicios para llamadas API
│   │   │   ├── medical-report.service.ts  # Servicio de reportes médicos
│   │   │   ├── user-service.service.ts    # Servicio de usuarios
│   │   │   └── loader.service.ts          # Servicio de carga
│   └── assets/                             # Archivos estáticos e imágenes
│── documentation/                          # Documentación generada por Compodoc
│── package.json                            # Dependencias y scripts del proyecto
│── README.md                               # Documentación del proyecto
```

---

## 🔧 **Instalación y Configuración**
### **1️⃣ Clonar el Repositorio**
```sh
git clone https://github.com/tu-usuario/frontend-proyecto-cancer.git
cd frontend-proyecto-cancer
```

### **2️⃣ Instalar Dependencias**
```sh
npm install
```

### **3️⃣ Ejecutar el Proyecto**
```sh
npm start
```
📉 **Por defecto, se ejecutará en:** `http://localhost:4200`

---

## 📝 **Documentación del Proyecto**
La documentación del código se generó con **JSDoc** y **Compodoc**.

### **📌 Generar Documentación**
Si realizas cambios en los archivos y necesitas actualizar la documentación, usa:

```sh
npm run docs
```

### **📌 Servir Documentación en el Navegador**
```sh
npm run docs:serve
```
📉 **Acceder en:** `http://localhost:8080`

### **📌 Modo "watch" para Actualización Automática**
Para regenerar la documentación automáticamente cuando se hagan cambios en el código:

```sh
npm run docs:watch
```

---

## 💡 **Explicación de la Documentación**
### **📄 Documentación con JSDoc**
Se usó **JSDoc** para documentar los servicios, componentes y módulos de Angular.
Ejemplo de comentario en JSDoc:

```typescript
/**
 * Servicio para gestionar reportes médicos.
 */
@Injectable({
  providedIn: 'root'
})
export class MedicalReportService {
  /**
   * Obtiene la lista de pacientes con reportes médicos generados.
   * @returns {Observable<any[]>} Lista de pacientes.
   */
  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patients`);
  }
}
```

### **📄 Generación con Compodoc**
Compodoc analiza los comentarios **JSDoc** y genera documentación visual en formato HTML.

- 📝 **Archivos Documentados:** Servicios, componentes, módulos y rutas de Angular.
- 📊 **Diagramas:** Muestra la estructura del proyecto en un árbol visual.

---

## 🚀 **Características Implementadas**
✅ **Autenticación de Usuarios** (Registro/Login con Supabase).  
✅ **Carga y almacenamiento de imágenes médicas** (para diagnóstico).  
✅ **Visualización de gráficos interactivos** (ApexCharts, Chart.js).  
✅ **Generación de Reportes Médicos en PDF**.  
✅ **Evaluación de IA con Encuestas y Feedback de Médicos**.  
✅ **Predicción de diagnóstico con IA**.


---


## 📝 **Licencia**
Este proyecto está bajo la **Licencia MIT**, lo que significa que puedes modificarlo y distribuirlo libremente.

