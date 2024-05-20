export const userProfileTypeName = (type) => {
  switch (type) {
    case 'PROFESSOR': return 'Professor';
    case 'ADMINISTRACAO' : return  'Administrador';
    case 'ALUNO' : return 'Aluno'; 
    default: break;
  }
  return;
}

