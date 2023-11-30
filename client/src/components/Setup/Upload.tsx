import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconFileTypePdf, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, PDF_MIME_TYPE } from '@mantine/dropzone';

function Upload(props: Partial<DropzoneProps>) {
  return (
    <Dropzone
      onDrop={(files: any) => console.log('accepted files', files)}
      onReject={(files: any) => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={PDF_MIME_TYPE}
      style={
        {
          border: '1px dashed grey', 
          borderWidth: 2,
          borderRadius: 4,
          padding: '10px 50px',
          marginTop: -25,
        }
      }
      {...props}
    >
      <Group justify="center" gap="md" mih={200} style={{ pointerEvents: 'none'}}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconFileTypePdf
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="md" inline>
            Upload Certificate of Registration
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach file in PDF format to proceed
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}


export { Upload };