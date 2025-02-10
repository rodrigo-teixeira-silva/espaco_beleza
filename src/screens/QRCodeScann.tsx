import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Button, View, Text } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner'; // Importando o scanner de QR Code
import { CameraType } from 'expo-image-picker';
import { Camera } from 'expo-camera';


const QRCodeScanner: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState(CameraType.back);

  // Solicita permissão para acessar a câmera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Função chamada ao escanear QR Code
  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    Alert.alert('QR Code Escaneado', `Dados: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para a câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          <Button title="Inverter Câmera" onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} />
        </View>
      </Camera>
      {scanned && <Button title="Escanear Novamente" onPress={() => setScanned(false)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
});

export default QRCodeScanner;
