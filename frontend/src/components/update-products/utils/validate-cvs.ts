export function validateCSV(file: File): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event?.target?.result) {
        resolve(false); // No data to validate, consider it as invalid
        return;
      }
      const csvData = event.target.result as string;
      const lines = csvData.split('\n');

      const isValid = lines.every((line: string, index: number) => {
        const columns = line.split(',');
        if (columns.length !== 2) {
          alert(
            `Linha ${index + 1
            }: Formato de linha inválido. Cada linha deve ter exatamente dois campos.`,
          );
          return false;
        }
        return true;
      });

      resolve(isValid);
    };

    reader.onerror = () => {
      reject(new Error('Erro ao ler o arquivo CSV.'));
    };

    reader.readAsText(file);
  });
}
