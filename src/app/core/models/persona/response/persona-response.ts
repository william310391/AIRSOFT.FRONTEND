export interface PersonaResponse {
  personaID: number;
  tipoDocumentoID: number;
  tipoDocumento: string | null;
  numeroDocumento: string;
  nombre: string | null;
  apellidoPaterno: string | null;
  apellidoMaterno: string | null;
  fechaNacimiento: string; // puedes usar Date si lo transformas
  sexoID: number;
  sexo: string | null;
  paisID: number;
  pais: string | null;
  usuarioRegistroID: number;
  usuarioRegistro: string | null;
  usuarioModeficionID: number;
  fechaModificion: string | null;
}
