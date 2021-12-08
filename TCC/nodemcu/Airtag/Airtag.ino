#include <EEPROM.h>
#include <ESP8266WiFi.h>   
#include <ESP8266HTTPClient.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>

     
#define Led  14
#define ConWiFi  4

//Variaveis
int i = 0;
int statusCode;
const char* ssid = "text";
const char* passphrase = "text";
String st;
String content;


//Declaração de funções
bool testWifi(void);
void launchWeb(void);
void setupAP(void);

//Estabelecendo uma porta local 80 quando for necessaria
ESP8266WebServer server(80);

WiFiClient client;
HTTPClient httpClient;
const char *URL = "http://tnsoft.ddns.net:39999/newdevice";
String NOME = "AirTag";
char *ipAddress;

const IPAddress remote_ip(8, 8, 8, 8);


// Configuraçoes e Endereço de Internet WIFI
WiFiServer serverEsp (8090);
//Variável para armazenar a solicitação HTTP
String header;
// Hora Atual
unsigned long currentTime = millis();
// Vez anterior
unsigned long previousTime = 0; 
//Defina o tempo limite em milissegundos 
const long timeoutTime = 2000;
int Status_Led = LOW; 



String CSS = "<style>"
                "html { "
                    "font-family: Helvetica;"
                    "display: inline-block;"
                    "margin: 0px auto;"
                    "text-align: center;"
                    "background-color: #F055F0;"
                "}"
                    ".button {"
                        "background-color: #4CAF50;"
                        "border-radius: 15px;"
                        "color: white;"
                        "padding: 10px 20px;"
                        "text-decoration: none;"
                        "font-size: 20px;"
                        "margin: 2px;"
                        "cursor: pointer;"
                      "}"
                      ".button2 { "
                          "background-color: #555555;"
                       "}"
              "</style>";
                



void setup()
{

  Serial.begin(115200); //Initialising if(DEBUG)Serial Monitor
  Serial.println();
  Serial.println("Disconnecting previously connected WiFi");
  WiFi.disconnect();
  EEPROM.begin(512); //Initialasing EEPROM
  delay(10);
  //pinMode(LED_BUILTIN, OUTPUT);
  Serial.println();
  Serial.println();
  Serial.println("Startup");
  delay(50);
  pinMode(ConWiFi,   OUTPUT);
  digitalWrite(ConWiFi,   HIGH);

  //---------------------------------------- leitura do eeprom pra verificar a senha
  Serial.println("Reading EEPROM ssid");

  String esid;
  for (int i = 0; i < 32; ++i)
  {
    esid += char(EEPROM.read(i));
  }
  Serial.println();
  Serial.print("SSID: ");
  Serial.println(esid);
  Serial.println("Reading EEPROM pass");

  String epass = "";
  for (int i = 32; i < 96; ++i)
  {
    epass += char(EEPROM.read(i));
  }
  Serial.print("PASS: ");
  Serial.println(epass);


  WiFi.begin(esid.c_str(), epass.c_str());
  if (testWifi())
  {
    Serial.println("Succesfully Connected!!!");
    delay(150);
    digitalWrite(ConWiFi,   LOW);
    postMacIP();
    delay(50);
    pinMode(Led,   OUTPUT);
    digitalWrite(Led,   LOW);
    serverEsp.begin();
    return;
  }
  else
  {
    Serial.println("Turning the HotSpot On");
    launchWeb();
    setupAP();// Setup HotSpot
  }

  Serial.println();
  Serial.println("Waiting.");
  
  while ((WiFi.status() != WL_CONNECTED))
  {
    Serial.print(".");
    delay(100);
    server.handleClient();
  }

}
String headerHtml(String title){

  String cabecalho = "<!DOCTYPE html>"
                          "<html>"
                            "<head>"
                               "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
                               "<link rel=\"icon\" href=\"data:,\">"
                               "<title>"+title+"</title>"
                               +CSS+
                               "</head>";
  
  return cabecalho;
}



void loop() {
   WiFiClient client = serverEsp.available();    // Ouça os clientes que chegam
   if (client) {                             // Se um novo cliente se conectar
    currentTime = millis();
    previousTime = currentTime;
    Serial.println("New Client.");          // imprimir uma mensagem na porta serial
    String currentLine = "";// faça uma string para conter os dados de entrada do cliente
    while (client.connected() && currentTime - previousTime <= timeoutTime) {  // faz um loop enquanto o cliente está conectado
      currentTime = millis();
      if (client.available()) {             // se houver bytes para ler do cliente
        char c = client.read();             // leia um byte, então
        Serial.write(c);                    // imprima no monitor serial
        header += c;
        if (c == '\n') {                    // se o byte é um caractere de nova linha
          // se a linha atual estiver em branco, você terá dois caracteres de nova linha em uma linha.
          // esse é o fim da solicitação HTTP do cliente, então envie uma resposta:
          if (currentLine.length() == 0) {
            // Os cabeçalhos HTTP sempre começam com um código de resposta (por exemplo, HTTP / 1.1 200 OK)
            // e um tipo de conteúdo para que o cliente saiba o que está por vir, em seguida, uma linha em branco:
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type: application/json");


            




            // Verifica o caracter enviado pelo html (GET)********************************

            //**************************************************
            if (header.indexOf("GET /L1") >= 0) {
              digitalWrite(Led, 1);              
            }
            if (header.indexOf("GET /L0") >= 0) {
             digitalWrite(Led, 0);
            }
             if (header.indexOf("GET /ping") >= 0) {
              client.println("ok");
            }
            if (header.indexOf("GET /status") >= 0) {
              StaticJsonDocument<500> doc;

            
              // cria um array com a leitura dos valores digitais
              JsonArray digitalValues = doc.createNestedArray("digital");
        
         
               
                int value = digitalRead(Led);
            
    
                digitalValues.add(value);


                
              
            
              Serial.print(F("Sending: "));
              serializeJson(doc, Serial);
              Serial.println();
            
              
              client.println(F("HTTP/1.0 200 OK"));
              client.println(F("Content-Type: application/json"));
              client.println(F("Connection: close"));
              client.print(F("Content-Length: "));
              client.println(measureJsonPretty(doc));
              client.println();
            

              serializeJsonPretty(doc, client);
            }
            client.println();                     // A resposta HTTP termina com outra linha em branco:
            break;                                // interromper o loop while:
          } else {
            currentLine = "";                     // se você recebeu uma nova linha, limpe currentLine:
          }
        } else if (c != '\r') {
          currentLine += c;
        }
      }
    }
    // Clear the header variable
    header = "";
    // fecha a conexão:
    client.stop();
    Serial.println("Client Disconnected.");
    Serial.println("------------------------------------------------------------");
  }
    
}

//converte o array ip em uma string

String ipToStr(IPAddress ip){
  String s="";
  for (int i=0; i<4; i++) {
    s += i  ? "." + String(ip[i]) : String(ip[i]);
  }
  return s;
}

//monta e posta o mac adress e ip ao servidor
void postMacIP(){
    String data = "nome="+NOME+"&mac="+String(WiFi.macAddress())+"&ip="+ipToStr(WiFi.localIP())+"";
    //String data = "name=John&age=20";
 
    httpClient.begin(client, URL);
    httpClient.addHeader("Content-Type", "application/x-www-form-urlencoded");
    httpClient.POST(data);
    String content = httpClient.getString();
    httpClient.end();
}


//----------------------------------------------- Funçoes utilizadas para salvar as credenciais da rede wifi

//Testa a conexão atual
bool testWifi(void)
{
  int c = 0;
  Serial.println("Waiting for Wifi to connect");
  while ( c < 20 ) {
    if (WiFi.status() == WL_CONNECTED)
    {
      return true;
    }
    delay(500);
    Serial.print("*");
    c++;
  }
  Serial.println("");
  Serial.println("Connect timed out, opening AP");
  return false;
}

//Cria um hotspot caso não houver conexão
void launchWeb()
{
  Serial.println("");
  if (WiFi.status() == WL_CONNECTED)
    Serial.println("WiFi connected");
  Serial.print("Local IP: ");
  Serial.println(WiFi.localIP());
  Serial.print("SoftAP IP: ");
  Serial.println(WiFi.softAPIP());
  createWebServer();
  // Start the server
  server.begin();
  Serial.println("Server started");
}

//Escaneia a rede local

void setupAP(void)
{
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  int n = WiFi.scanNetworks();
  Serial.println("scan done");
  if (n == 0)
    Serial.println("no networks found");
  else
  {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i)
    {
      // Print SSID and RSSI for each network found
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));
      Serial.print(")");
      Serial.println((WiFi.encryptionType(i) == ENC_TYPE_NONE) ? " " : "*");
      delay(10);
    }
  }
  Serial.println("");
  st = "<ol>";
  for (int i = 0; i < n; ++i)
  {
    // Print SSID and RSSI for each network found
    st += "<li>";
    st += WiFi.SSID(i);
    st += " (";
    st += WiFi.RSSI(i);

    st += ")";
    st += (WiFi.encryptionType(i) == ENC_TYPE_NONE) ? " " : "*";
    st += "</li>";
  }
  st += "</ol>";
  delay(100);
  WiFi.softAP("FinderSmart", "");
  Serial.println("softap");
  launchWeb();
  Serial.println("over");
}

//monta a pagina webserver para autenticar a rede
void createWebServer()
{
 {
    server.on("/", []() {

      IPAddress ip = WiFi.softAPIP();
      String ipStr = String(ip[0]) + '.' + String(ip[1]) + '.' + String(ip[2]) + '.' + String(ip[3]);
      content = "<!DOCTYPE HTML>\r\n<html>Hello from ESP8266 at ";
      content += "<form action=\"/scan\" method=\"POST\"><input type=\"submit\" value=\"scan\"></form>";
      content += ipStr;
      content += "<p>";
      content += st;
      content += "</p><form method='get' action='setting'><label>SSID: </label><input name='ssid' length=32><input name='pass' length=64><input type='submit'></form>";
      content += "</html>";
      server.send(200, "text/html", content);
    });
    server.on("/scan", []() {
      //setupAP();
      IPAddress ip = WiFi.softAPIP();
      String ipStr = String(ip[0]) + '.' + String(ip[1]) + '.' + String(ip[2]) + '.' + String(ip[3]);

      content = "<!DOCTYPE HTML>\r\n<html>go back";
      server.send(200, "text/html", content);
    });

    server.on("/setting", []() {
      String qsid = server.arg("ssid");
      String qpass = server.arg("pass");
      if (qsid.length() > 0 && qpass.length() > 0) {
        Serial.println("clearing eeprom");
        for (int i = 0; i < 96; ++i) {
          EEPROM.write(i, 0);
        }
        Serial.println(qsid);
        Serial.println("");
        Serial.println(qpass);
        Serial.println("");

        Serial.println("writing eeprom ssid:");
        for (int i = 0; i < qsid.length(); ++i)
        {
          EEPROM.write(i, qsid[i]);
          Serial.print("Wrote: ");
          Serial.println(qsid[i]);
        }
        Serial.println("writing eeprom pass:");
        for (int i = 0; i < qpass.length(); ++i)
        {
          EEPROM.write(32 + i, qpass[i]);
          Serial.print("Wrote: ");
          Serial.println(qpass[i]);
        }
        EEPROM.commit();

        content = "{\"Success\":\"saved to eeprom... reset to boot into new wifi\"}";
        statusCode = 200;
        ESP.reset();
      } else {
        content = "{\"Error\":\"404 not found\"}";
        statusCode = 404;
        Serial.println("Sending 404");
      }
      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.send(statusCode, "application/json", content);

    });
  } 
}
