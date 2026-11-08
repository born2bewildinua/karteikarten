# Karteikasten

Karteikarten-App mit Stufen-System (1, 2, 4, 8, 16, 32 Tage), Login und Synchronisation zwischen Geräten.
Läuft auf GitHub Pages, Login und Daten über Firebase (kostenloser Spark-Tarif).

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Die App inkl. Vokabelliste Deutsch – Ukrainisch |
| `sw.js` | Offline-Betrieb (hält die App-Dateien vor) |
| `manifest.json`, `icon-*.png`, `apple-touch-icon.png` | App-Symbol auf dem Home-Bildschirm |
| `firestore.rules` | Sicherheitsregeln für die Datenbank (wird in Firebase eingefügt, nicht gebraucht auf GitHub) |

## Einrichtung (ca. 30 Minuten, einmalig)

### 1. Firebase-Projekt anlegen
1. <https://console.firebase.google.com> öffnen, mit deinem Google-Konto anmelden.
2. **Projekt erstellen** → Name z. B. `karteikasten` → Google Analytics **deaktivieren** → Erstellen.

### 2. Login einrichten
1. Links **Build → Authentication → Jetzt starten**.
2. Reiter **Sign-in method** → **E-Mail/Passwort** → aktivieren (nur den ersten Schalter) → Speichern.
3. Reiter **Users** → **Nutzer hinzufügen** → E-Mail und Passwort deiner Frau eintragen.

### 3. Datenbank einrichten
1. Links **Build → Firestore Database → Datenbank erstellen**.
2. Standort: `europe-west3 (Frankfurt)` → **Im Produktionsmodus starten** → Erstellen.
3. Reiter **Regeln**: alles ersetzen durch den Inhalt von `firestore.rules` → **Veröffentlichen**.

### 4. Konfiguration in die App eintragen
1. Oben links Zahnrad → **Projekteinstellungen** → unten bei „Meine Apps“ auf das Web-Symbol `</>` klicken.
2. Name z. B. `karteikasten-web`, Firebase Hosting **nicht** anhaken → App registrieren.
3. Es erscheint ein Block `const firebaseConfig = { apiKey: "...", ... }`.
4. `index.html` in einem Texteditor öffnen. Ganz oben im Skript steht `FIREBASE_CONFIG` mit `HIER_EINFUEGEN`.
   Die sechs Werte von dort übernehmen und speichern.

   (Diese Werte sind nicht geheim. Geschützt werden die Daten durch Login und Regeln.)

### 5. Auf GitHub Pages veröffentlichen
1. Auf <https://github.com> ein Konto anlegen bzw. anmelden.
2. **New repository** → Name `karteikasten` → **Public** → Create.
3. **uploading an existing file** → alle Dateien aus diesem Ordner hineinziehen → **Commit changes**.
4. **Settings → Pages** → Source: **Deploy from a branch** → Branch `main`, Ordner `/ (root)` → Save.
5. Nach 1–2 Minuten ist die App erreichbar unter `https://DEINNAME.github.io/karteikasten/`.

### 6. Domain in Firebase freigeben
Firebase → **Authentication → Einstellungen → Autorisierte Domains** → **Domain hinzufügen** → `DEINNAME.github.io`.

### 7. Aufs Handy bringen
1. Link auf dem Handy öffnen (iPhone: **Safari**, Android: **Chrome**).
2. Anmelden → beim ersten Mal „Vokabelliste übernehmen“ tippen.
3. iPhone: Teilen-Symbol → **Zum Home-Bildschirm**. Android: Drei-Punkte-Menü → **App installieren** bzw. **Zum Startbildschirm hinzufügen**.
4. Auf dem Laptop einfach denselben Link öffnen und mit denselben Daten anmelden.

## Updates einspielen
Neue Version von `index.html` auf GitHub hochladen (Datei überschreiben, Commit).
**Wichtig:** Vorher wieder die eigene `FIREBASE_CONFIG` eintragen. Die App lädt die neue Version beim nächsten Öffnen mit Internet.

## Hinweise
- Offline lernen funktioniert, sobald die App einmal mit Internet geöffnet wurde. Änderungen werden übertragen, wenn wieder Verbindung besteht.
- Das Passwort lässt sich in der App über „Passwort vergessen?“ zurücksetzen.
- Kosten: Der kostenlose Firebase-Tarif reicht für eine Person bei Weitem.
