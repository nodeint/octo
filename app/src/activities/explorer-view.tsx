import { createTreeCollection, EmptyState, TreeView } from '@chakra-ui/react';
import { SidebarSection, SidebarView } from '@workspace/ui';
import { LuChevronRight, LuFile, LuFolder } from 'react-icons/lu';

type FileNode = {
  readonly id: string;
  readonly name: string;
  readonly children?: readonly FileNode[];
};

const files = createTreeCollection<FileNode>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'root',
    name: '',
    children: [
      {
        id: 'app',
        name: 'app',
        children: [
          { id: 'app/root.tsx', name: 'root.tsx' },
          { id: 'app/routes.ts', name: 'routes.ts' },
        ],
      },
      {
        id: 'packages',
        name: 'packages',
        children: [{ id: 'packages/ui', name: 'ui', children: [{ id: 'packages/ui/index.ts', name: 'index.ts' }] }],
      },
      { id: 'package.json', name: 'package.json' },
    ],
  },
});

export function ExplorerView(): React.ReactElement {
  return (
    <SidebarView title="Explorer">
      <SidebarSection title="Octo">
        <TreeView.Root collection={files} defaultExpandedValue={['app']} variant="subtle">
          <TreeView.Tree>
            <TreeView.Node
              render={({ node, nodeState }: TreeView.NodeRenderProps<FileNode>) =>
                nodeState.isBranch ? (
                  <TreeView.BranchControl>
                    <TreeView.BranchIndicator>
                      <LuChevronRight />
                    </TreeView.BranchIndicator>
                    <LuFolder />
                    <TreeView.BranchText>{files.stringifyNode(node)}</TreeView.BranchText>
                  </TreeView.BranchControl>
                ) : (
                  <TreeView.Item>
                    <LuFile />
                    <TreeView.ItemText>{files.stringifyNode(node)}</TreeView.ItemText>
                  </TreeView.Item>
                )
              }
            />
          </TreeView.Tree>
        </TreeView.Root>
      </SidebarSection>
      <SidebarSection title="Outline" defaultOpen={false}>
        <EmptyState.Root size="sm">
          <EmptyState.Content>
            <EmptyState.Description>No symbols found</EmptyState.Description>
          </EmptyState.Content>
        </EmptyState.Root>
      </SidebarSection>
    </SidebarView>
  );
}
